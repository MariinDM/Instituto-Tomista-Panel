import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  locale = 'es'

  constructor(private http:HttpClient) { }

  getall(): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${this.locale}/categories/get`);
  }
  getone(id:number): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${this.locale}/categories/get/${id}`);
  }
  insert(category:Category):Observable<any>{
    return this.http.post(`${environment.apiUrl}v1/${this.locale}/categories/create`, category)
  }
  update(id:number, category:Category):Observable<any>{
    return this.http.put(`${environment.apiUrl}v1/${this.locale}/categories/update/${id}`, category)
  }
  delete(id:number):Observable<any>{
    return this.http.delete(`${environment.apiUrl}v1/${this.locale}/categories/delete/${id}`)
  }
}
