import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) { }

  getall(code: string,): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/faqs/get`);
  }
  getone(code: string, id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/faqs/get/${id}`);
  }
  insert(code: string, tutorial: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}v1/${code}/faqs/create`, tutorial)
  }
  update(code: string, id: number, tutorial: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/faqs/update/${id}`, tutorial)
  }
  delete(code: string, id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}v1/${code}/faqs/delete/${id}`)
  }
}
