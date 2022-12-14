import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private http: HttpClient) { }

  getData(code: string,): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/resources/get`);
  }
  getDataOne(code: string, id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/resources/get/${id}`);
  }
  sendData(code: string, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}v1/${code}/resources/create`, data)
  }
  updateData(code: string, id: number, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/resources/update/${id}`, data)
  }
  deleteData(code: string, id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}v1/${code}/resources/delete/${id}`)
  }
  uploadFile(code: string, id: number, image: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/resources/uploads/Resources/${id}`, image)
  }
}
