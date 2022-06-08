import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  locale = 'es'

  constructor(private http:HttpClient) { }

  getall(): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${this.locale}/users/get`);
  }
  getone(id:number): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${this.locale}/users/get/${id}`);
  }
  insert(user:User):Observable<any>{
    return this.http.post(`${environment.apiUrl}v1/${this.locale}/users/post`, user)
  }
  update(id:number, user:User):Observable<any>{
    return this.http.put(`${environment.apiUrl}v1/${this.locale}/users/update/${id}`, user)
  }
  delete(id:number):Observable<any>{
    return this.http.delete(`${environment.apiUrl}v1/${this.locale}/users/delete/${id}`)
  }
}
