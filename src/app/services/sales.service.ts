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

  deleteClient(id:number): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.delete<any>(`${ environment.apiUrl }v1/${code}/clients/delete/${id}`, {})
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
  deleteDealer(id:number):Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.delete<any>(`${ environment.apiUrl }v1/${code}/dealers/delete/${id}`, {})
  }

  getUsers(): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.get<any>(`${ environment.apiUrl }v1/${code}/users/get`,{})
  }

  getDevices(): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.get<any>(`${ environment.apiUrl }v1/${code}/devices/get?devices=true`,{})
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

  deleteRegion(id:number):Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.delete<any>(`${ environment.apiUrl }v1/${code}/regions/delete/${id}`, {})
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

  deleteSale(id:number): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.delete<any>(`${ environment.apiUrl }v1/${code}/sales/delete/${id}`, {})
  }

  oneSale(id:number): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.get<any>(`${ environment.apiUrl }v1/${code}/sales/get/${id}`, {})
  }
}
