import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { View } from '../interfaces/view';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor(private http:HttpClient) { }

  getall(code:string,): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/${code}/views/get`);
  }
  getone(code:string,id:number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/${code}/views/get/${id}`);
  }
  insert(code:string,view:View):Observable<any>{
    return this.http.post(`${environment.apiUrl}/api/v1/${code}/views/create`, view)
  }
  update(code:string,id:number, view:View):Observable<any>{
    return this.http.put(`${environment.apiUrl}/api/v1/${code}/views/update/${id}`, view)
  }
  delete(code:string,id:number):Observable<any>{
    return this.http.delete(`${environment.apiUrl}/api/v1/${code}/views/delete/${id}`)
  }
}
