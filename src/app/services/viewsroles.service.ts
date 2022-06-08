import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Viewsroles } from '../interfaces/viewsroles';

@Injectable({
  providedIn: 'root'
})
export class ViewsrolesService {

  locale = 'es'

  constructor(private http: HttpClient) { }

  getall(): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${this.locale}/roles_views/get`);
  }

  update(id: number, vr: Viewsroles): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${this.locale}/vr/roles_views/${id}`, vr)
  }
}
