import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  constructor(private http:HttpClient) { }

  getControllerVersions(): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.get<any>(`${ environment.apiUrl }v1/${code}/controller_versions/get`,{})
  }

  sendControllerVersions(data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.post<any>(`${ environment.apiUrl }v1/${code}/controller_versions/create`, data, {})
  }

  updateControllerVersions(id:number, data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.put<any>(`${ environment.apiUrl }v1/${code}/controller_versions/update/${id}`, data, {})
  }

  getHardwareVersions(): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.get<any>(`${ environment.apiUrl }v1/${code}/hardware_versions/get`,{})
  }

  sendHardwareVersions(data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.post<any>(`${ environment.apiUrl }v1/${code}/hardware_versions/create`, data, {})
  }

  updateHardwareVersions(id:number, data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.put<any>(`${ environment.apiUrl }v1/${code}/hardware_versions/update/${id}`, data, {})
  }

  getFirmwareVersions(): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.get<any>(`${ environment.apiUrl }v1/${code}/firmware_versions/get`,{})
  }

  sendFirmwareVersions(data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.post<any>(`${ environment.apiUrl }v1/${code}/firmware_versions/create`, data, {})
  }

  updateFirmwareVersions(id:number, data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.put<any>(`${ environment.apiUrl }v1/${code}/firmware_versions/update/${id}`, data, {})
  }

  getDeviceTypes(): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.get<any>(`${ environment.apiUrl }v1/${code}/device_types/get`,{})
  }

  sendDeviceTypes(data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.post<any>(`${ environment.apiUrl }v1/${code}/device_types/create`, data, {})
  }

  updateDeviceTypes(id:number, data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.put<any>(`${ environment.apiUrl }v1/${code}/device_types/update/${id}`, data, {})
  }

  getDeviceVersions(): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.get<any>(`${ environment.apiUrl }v1/${code}/device_versions/get`,{})
  }

  sendDeviceVersions(data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.post<any>(`${ environment.apiUrl }v1/${code}/device_versions/create`, data, {})
  }

  updateDeviceVersions(id:number, data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.put<any>(`${ environment.apiUrl }v1/${code}/device_versions/update/${id}`, data, {})
  }

  getNecessities(): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.get<any>(`${ environment.apiUrl }v1/${code}/necessities/get`,{})
  }

  sendNecessities(data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.post<any>(`${ environment.apiUrl }v1/${code}/necessities/create`, data, {})
  }

  updateNecessities(id:number, data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.put<any>(`${ environment.apiUrl }v1/${code}/necessities/update/${id}`, data, {})
  }

  getModels(): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.get<any>(`${ environment.apiUrl }v1/${code}/models/get`,{})
  }

  sendModels(data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.post<any>(`${ environment.apiUrl }v1/${code}/models/create`, data, {})
  }

  updateModels(id:number, data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.put<any>(`${ environment.apiUrl }v1/${code}/models/update/${id}`, data, {})
  }

  getDevices(): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.get<any>(`${ environment.apiUrl }v1/${code}/devices/get`,{})
  }

  sendDevices(data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.post<any>(`${ environment.apiUrl }v1/${code}/devices/create`, data, {})
  }

  updateDevices(id:number, data:any): Observable<any>{
    let code = localStorage.getItem('code')
    return this.http.put<any>(`${ environment.apiUrl }v1/${code}/devices/update/${id}`, data, {})
  }
}
