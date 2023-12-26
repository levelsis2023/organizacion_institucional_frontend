import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription, timer } from 'rxjs';
import { map, catchError, finalize, switchMap } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; 


  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;
  changeUserSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(undefined);
  private refreshTimer: Subscription;

  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  user: any;
  token: string;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.loadstorage();
    
    var timerMiliseconds = 300000;
    if (this.isLogued()) {
      this.me();
      const jwt = JSON.parse(localStorage.getItem('JWT') || '{}');
      if(jwt?.expires_in){
        timerMiliseconds= (jwt.expires_in * 1000)/4;
      }
    }
    
    this.refreshTimer = timer(0, timerMiliseconds).pipe(
      switchMap(() => this.checkAndRefreshToken())
    ).subscribe();

  }

  async checkAndRefreshToken(): Promise<void> {
    if (this.isLogued()) {  
      const jwt = JSON.parse(localStorage.getItem('JWT') || '{}');
      const currentTime = new Date().getTime();
      const expires_in = jwt.expires_in * 1000;
  
      const timeRemaining =currentTime - jwt.current_time;
      const timeBeforeExpire = (expires_in / 4);

      if (timeRemaining > (expires_in - timeBeforeExpire)) {
        await this.refreshToken();
      }
    }
  }
  

  loadstorage() {
    if (localStorage.getItem("JWT")) {
      this.token = JSON.parse(localStorage.getItem("JWT")).token;
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.user = null;
      this.token = '';
    }
  }

  // public methods
  isLogued() {
    return (this.token.length > 5) ? true : false;
  }

  login(email: string, password: string) {
    this.isLoadingSubject.next(true);
    return this.http.post("api/login", { email, password }).pipe(
      map((auth: any) => {
        if (auth) {
          console.log('auth', auth);
          return this.setAuthFromLocalStorage(auth);
        } else {
          return auth;
        }
      }),
      // switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }



  logout() {
    // localStorage.removeItem(this.authLocalStorageToken);
    this.user = null;
    this.token = '';
    localStorage.removeItem('JWT');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  // private methods
  private setAuthFromLocalStorage(auth: any): boolean {
    // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth) {
      localStorage.setItem('JWT', JSON.stringify({
        'token': auth.token,
        'token_type': 'bearer',
        'expires_in': auth.expires_in,
        'current_time': new Date().getTime()
      }));

      localStorage.setItem('user', JSON.stringify(auth.user));

      this.user = auth.user;
      this.token = auth.token;
      return true;
    }
    return false;
  }

  me() {
    this.http.post(`api/me`, {}).subscribe((resp: any) => {
      this.user = resp;
      localStorage.setItem('user', JSON.stringify(resp));
      this.changeUserSubject.next(resp);
    });
  }

  onChangeUser(): Observable<UserModel> {
    return this.changeUserSubject.asObservable();
  }


  async refreshToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`api/refresh`, {token:this.token}).subscribe({
        next: (resp: any) => {
          this.setAuthFromLocalStorage(resp);
          resolve(resp);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
    this.refreshTimer?.unsubscribe();
  }
}
