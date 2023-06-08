import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }


  sendMailRoute(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}send/route/signed`, data, {})
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}users`, {})
  }

  addUser(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}users`, data, {})
  }

  updateUser(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}users/${data.id}`, data, {})
  }

  deleteUser(data: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}users/${data.id}`, {})
  }

  getRoles(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}roles`, {})
  }

  addRole(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}roles`, data, {})
  }

  updateRole(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}roles/${data.id}`, data, {})
  }

  deleteRole(data: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}roles/${data.id}`, {})
  }


}
