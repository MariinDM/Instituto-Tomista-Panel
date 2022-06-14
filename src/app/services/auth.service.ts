import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(user: Auth): Observable<any> {
    return this.http.post(`${environment.apiUrl}auth/en/login`, user)
      .pipe(
        map((res: any) => {
          this.saveToken(res.auth.token)
          return res
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  private saveToken(token: string): void {
    localStorage.setItem("token", token)
    // localStorage.setItem("refreshToken", refreshToken)
  }

  private clearToken() {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
  }

  private handlerError(err: any): Observable<never> {
    let errorMessage = `Ocurrio un Error`;
    if (err) {
      errorMessage = err.message
      console.log(errorMessage)
    }
    return throwError(errorMessage)
  }

  logout() {
    const token: any = localStorage.getItem('token')
    this.clearToken()
    return this.http.post(`${environment.apiUrl}/api/auth/en/logout`, token)
  }

  getInfo(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/auth/en/me`);
  }

  changePassword(code: string, obj: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/v1/${code}/password/update`, obj);
  }
  passwordDefault(code: string, obj: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/v1/${code}/password/default`, obj);
  }
}
