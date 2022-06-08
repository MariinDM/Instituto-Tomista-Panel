import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rol } from '../interfaces/rol';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  locale = 'es'

  constructor(private http:HttpClient) { }

  getall(): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${this.locale}/roles/get`);
  }
  getone(id:number): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${this.locale}/roles/get/${id}`);
  }
  insert(rol:Rol):Observable<any>{
    return this.http.post(`${environment.apiUrl}v1/${this.locale}/roles/create`, rol)
  }
  update(id:number, rol:Rol):Observable<any>{
    return this.http.put(`${environment.apiUrl}v1/${this.locale}/roles/update/${id}`, rol)
  }
  delete(id:number):Observable<any>{
    return this.http.delete(`${environment.apiUrl}v1/${this.locale}/roles/delete/${id}`)
  }
}
