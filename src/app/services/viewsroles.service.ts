import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Viewsroles } from '../interfaces/viewsroles';

@Injectable({
  providedIn: 'root'
})
export class ViewsrolesService {

  constructor(private http: HttpClient) { }

  getall(code: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/roles_views/get`);
  }
  getone(code: string, id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/roles_views/get/${id}`);
  }

  update(code: string, vr: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/roles_views/update`, vr)
  }

  delete(code: string, id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}v1/${code}/roles_views/delete/${id}`)
  }
}
