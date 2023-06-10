import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Auth } from "../interfaces/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(user: Auth): Observable<any> {
    return this.http.post(`${environment.apiUrl}login`, user).pipe(
      map((res: any) => {
        //console.log("res",res)
        this.saveToken(res.token.token);
        // Supongamos que tienes el ID en una variable llamada "id"
console.log(res.token.userid)
        // Guardar el ID en el localStorage
        localStorage.setItem("userId", res.userId);

        // Obtener el ID del localStorage
        const storedId = localStorage.getItem("userId");

        // Comprobar si el ID está almacenado y convertirlo a un número entero
        // if (storedId) {
        //   const userId = parseInt(storedId, 10);
        //   // Utiliza el ID almacenado en userId para realizar las operaciones que necesites
        // }

        return res;
      }),
      catchError((err) => this.handlerError(err))
    );
  }

  private saveToken(token: string): void {
    localStorage.setItem("token", token);
    // localStorage.setItem("refreshToken", refreshToken)
  }

  private clearToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }

  private handlerError(err: any): Observable<never> {
    let errorMessage = `Ocurrio un Error`;
    if (err) {
      errorMessage = err;
    }
    return throwError(errorMessage);
  }

  logout(): Observable<any> {
    const token: any = localStorage.getItem("token");
    return this.http.post(`${environment.apiUrl}logout`, token);
  }

  getInfo(): Observable<any> {
    return this.http.get(`${environment.apiUrl}auth/en/me`);
  }

  changePassword(code: string, obj: any): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}v1/${code}/password/update`,
      obj
    );
  }
  passwordDefault(code: string, obj: any): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}v1/${code}/password/default`,
      obj
    );
  }
}
