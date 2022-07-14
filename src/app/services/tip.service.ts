import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipService {

  constructor(private http: HttpClient) { }

  getall(code: string,): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/tips/get`);
  }
  getone(code: string, id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/tips/get/${id}`);
  }
  insert(code: string, tutorial: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}v1/${code}/tips/create`, tutorial)
  }
  update(code: string, id: number, tutorial: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/tips/update/${id}`, tutorial)
  }
  delete(code: string, id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}v1/${code}/tips/delete/${id}`)
  }
  uploadImg(code: string, id: number, image: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/resources/uploads/Tips/${id}`, image)
  }
}
