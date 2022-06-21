import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getall(code: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/categories/get`);
  }
  getone(code: string, id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/categories/get/${id}`);
  }
  insert(code: string, category: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}v1/${code}/categories/create`, category)
  }
  update(code: string, id: number, category: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/categories/update/${id}`, category)
  }
  delete(code: string, id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}v1/${code}/categories/delete/${id}`)
  }
  uploadImg(code: string, id: number, image: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/resources/uploads/Categories/${id}`, image)
  }
}
