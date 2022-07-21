import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  constructor(private http:HttpClient) { }

  getClients(): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.get<any>(`${ environment.apiUrl }v1/${code}/clients/get`,{})
  }

  sendClient(data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.post<any>(`${ environment.apiUrl }v1/${code}/clients/create`, data, {})
  }

  updateClient(id:number, data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.put<any>(`${ environment.apiUrl }v1/${code}/clients/update/${id}`, data, {})
  }

  getDealers(): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.get<any>(`${ environment.apiUrl }v1/${code}/dealers/get`,{})
  }

  sendDealer(data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.post<any>(`${ environment.apiUrl }v1/${code}/dealers/create`, data, {})
  }

  updateDealer(id:number, data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.put<any>(`${ environment.apiUrl }v1/${code}/dealers/update/${id}`, data, {})
  }

  getUsers(): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.get<any>(`${ environment.apiUrl }v1/${code}/users/get`,{})
  }

  getRegions(): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.get<any>(`${ environment.apiUrl }v1/${code}/regions/get`,{})
  }

  sendRegion(data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.post<any>(`${ environment.apiUrl }v1/${code}/regions/create`, data, {})
  }

  updateRegion(id:number, data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.put<any>(`${ environment.apiUrl }v1/${code}/regions/update/${id}`, data, {})
  }

  getSales(): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.get<any>(`${ environment.apiUrl }v1/${code}/sales/get`,{})
  }

  sendSale(data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.post<any>(`${ environment.apiUrl }v1/${code}/sales/create`, data, {})
  }

  updateSale(id:number, data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.put<any>(`${ environment.apiUrl }v1/${code}/sales/update/${id}`, data, {})
  }
}
