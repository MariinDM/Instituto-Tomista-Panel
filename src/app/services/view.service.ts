import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { View } from '../interfaces/view';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  locale = 'es'

  constructor(private http:HttpClient) { }

  getall(): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${this.locale}/views/get`);
  }
  getone(id:number): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${this.locale}/views/get/${id}`);
  }
  insert(view:View):Observable<any>{
    return this.http.post(`${environment.apiUrl}v1/${this.locale}/views/create`, view)
  }
  update(id:number, view:View):Observable<any>{
    return this.http.put(`${environment.apiUrl}v1/${this.locale}/views/update/${id}`, view)
  }
  delete(id:number):Observable<any>{
    return this.http.delete(`${environment.apiUrl}v1/${this.locale}/views/delete/${id}`)
  }
}
