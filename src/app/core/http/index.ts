/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BackendInterceptor } from './backend.interceptor';
/**
 * As documented in Angular the HttpInterceptors will be applied
 * in the same order they are provided on this list.
 * */
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true }
];
