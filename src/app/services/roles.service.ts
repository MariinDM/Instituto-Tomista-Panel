import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rol } from '../interfaces/rol';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http:HttpClient) { }

  getall(code:string, ): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/roles/get`);
  }
  getone(code:string, id:number): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/roles/get/${id}`);
  }
  insert(code:string, rol:Rol):Observable<any>{
    return this.http.post(`${environment.apiUrl}v1/${code}/roles/create`, rol)
  }
  update(code:string, id:number, rol:Rol):Observable<any>{
    return this.http.put(`${environment.apiUrl}v1/${code}/roles/update/${id}`, rol)
  }
  delete(code:string, id:number):Observable<any>{
    return this.http.delete(`${environment.apiUrl}v1/${code}/roles/delete/${id}`)
  }
}
