import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getall(code: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/${code}/categories/get`);
  }
  getone(code: string, id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/${code}/categories/get/${id}`);
  }
  insert(code: string, category: Category): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/v1/${code}/categories/create`, category)
  }
  update(code: string, id: number, category: Category): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/v1/${code}/categories/update/${id}`, category)
  }
  delete(code: string, id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/v1/${code}/categories/delete/${id}`)
  }
}
