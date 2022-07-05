import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getall(code: string,): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/tutorials/get`);
  }
  getone(code: string, id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/tutorials/get/${id}`);
  }
  insert(code: string, tutorial: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}v1/${code}/tutorials/create`, tutorial)
  }
  update(code: string, id: number, tutorial: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/tutorials/update/${id}`, tutorial)
  }
  delete(code: string, id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}v1/${code}/tutorials/delete/${id}`)
  }
  uploadImg(code: string, id: number, image: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/resources/uploads/Tutorials/${id}`, image)
  }
}
