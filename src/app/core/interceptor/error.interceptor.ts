import { AuthService } from '../service/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private router: Router) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 0) {
          // auto logout if 401 response returned from api
          let error = 'Ocurrio un Error'
          return throwError(error);
        }
        if (err.status === 401) {
          localStorage.clear()
          this.router.navigate(['/authentication/signin'])
        }
        const error = err.error.error.message;
        return throwError(error);
      })
    );
  }
}
