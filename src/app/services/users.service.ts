import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getall(code: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/users/get`);
  }
  getone(code: string, id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/users/get/${id}`);
  }
  insert(code: string, user: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}v1/${code}/users/create`, user)
  }
  update(code: string, id: number, user: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/users/update/${id}`, user)
  }
  delete(code: string, id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}v1/${code}/users/delete/${id}`)
  }
  getcities(code: string, id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/cities/get/${id}`);
  }
  getcountries(code: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/countries/get`);
  }
  getlanguages(code: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/languages/get`);
  }
  getDealers(): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.get(`${environment.apiUrl}v1/${code}/users/get?dealers=true`);
  }
  upProfile(code: string, id: number, image: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/resources/uploads/User/Profile/${id}`, image)
  }
  upInstitution(code: string, id: number, image: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/resources/uploads/User/Institution/${id}`, image)
  }
}
