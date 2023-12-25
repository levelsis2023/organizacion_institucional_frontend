import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class BackendInterceptor implements HttpInterceptor {

 private backend = environment.URL_BACKEND;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const accessToken = localStorage.getItem('token');
    if (req.url.startsWith('api/')) {
      const backendRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken??''),
        url: this.backend + req.url
      });
      
      console.log('BackendInterceptor: ' + this.backend + req.url);
      return next.handle(backendRequest);
    }

    return next.handle(req);

  }
}
