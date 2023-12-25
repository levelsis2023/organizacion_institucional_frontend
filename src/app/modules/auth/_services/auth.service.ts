import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthModel } from '../_models/auth.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { URL_BACKEND } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  //private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;


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
  }
  
  loadstorage(){
    if(localStorage.getItem("token")){
      this.token = localStorage.getItem("token");
      this.user = JSON.parse(localStorage.getItem("user"));
    }else{
      this.user=null;
      this.token = '';
    }
  }

// public methods
isLogued() {
    return ( this.token.length > 5 ) ? true : false;
}

login(email: string, password: string) {
    this.isLoadingSubject.next(true);
    return this.http.post("api/login",{email, password}).pipe(
      map((auth: any) => {
          if(auth.success){
            return this.setAuthFromLocalStorage(auth);
          }else{
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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  // private methods
private setAuthFromLocalStorage(auth: any): boolean {
    // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth.success) {
      localStorage.setItem('token', auth.data.access_token );
      localStorage.setItem('user', JSON.stringify(auth.data.usuario));
      this.user = auth.data.usuario;
      this.token = auth.data.access_token;
      return true;
    }
    return false;
}



// private getAuthFromLocalStorage(): AuthModel {
//     try {
//       const authData = JSON.parse(
//         localStorage.getItem(this.authLocalStorageToken)
//       );
//       return authData;
//     } catch (error) {
//       console.error(error);
//       return undefined;
//     }
// }

ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
}
}
