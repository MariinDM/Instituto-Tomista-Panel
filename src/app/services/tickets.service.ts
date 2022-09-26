import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }

  //TICKETS CATEGORIES
  getallTicketsCategories(): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.get(`${environment.apiUrl}v1/${code}/ticket_categories/get`);
  }
  getoneTicketsCategories(id: number): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.get(`${environment.apiUrl}v1/${code}/ticket_categories/get/${id}`);
  }
  insertTicketsCategories(data: any): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.post(`${environment.apiUrl}v1/${code}/ticket_categories/create`, data)
  }
  updateTicketsCategories(id: number, data: any): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.put(`${environment.apiUrl}v1/${code}/ticket_categories/update/${id}`, data)
  }
  deleteTicketsCategories(id: number): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.delete(`${environment.apiUrl}v1/${code}/ticket_categories/delete/${id}`)
  }
  //TICKETS MULTIMEDIA
  getallTicketsMultimedia(): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.get(`${environment.apiUrl}v1/${code}/ticket_multimedias/get`);
  }
  getoneTicketsMultimedia(id: number): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.get(`${environment.apiUrl}v1/${code}/ticket_multimedias/get/${id}`);
  }
  insertTicketsMultimedia(data: any): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.post(`${environment.apiUrl}v1/${code}/ticket_multimedias/create`, data)
  }
  updateTicketsMultimedia(id: number, data: any): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.put(`${environment.apiUrl}v1/${code}/ticket_multimedias/update/${id}`, data)
  }
  deleteTicketsMultimedia(id: number): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.delete(`${environment.apiUrl}v1/${code}/ticket_multimedias/delete/${id}`)
  }
  //TICKETS
  getTicketsStatus(): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.get(`${environment.apiUrl}v1/${code}/tickets/status`)
  }
  getallTickets(): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.get(`${environment.apiUrl}v1/${code}/tickets/get`);
  }
  getoneTickets(id: number): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.get(`${environment.apiUrl}v1/${code}/tickets/get/${id}`);
  }
  insertTickets(data: any): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.post(`${environment.apiUrl}v1/${code}/tickets/create`, data)
  }
  updateTickets(id: number, data: any): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.put(`${environment.apiUrl}v1/${code}/tickets/update/${id}`, data)
  }
  deleteTickets(id: number): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.delete(`${environment.apiUrl}v1/${code}/tickets/delete/${id}`)
  }

  //TICKETS COMMENTS
  getallTicketsComments(): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.get(`${environment.apiUrl}v1/${code}/ticket_comments/get`);
  }
  getoneTicketsComments(id: number): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.get(`${environment.apiUrl}v1/${code}/ticket_comments/get/${id}`);
  }
  insertTicketsComments(data: any): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.post(`${environment.apiUrl}v1/${code}/ticket_comments/create`, data)
  }
  updateTicketsComments(data: any): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.put(`${environment.apiUrl}v1/${code}/ticket_comments/update`, data)
  }
  deleteTicketsComments(id: number): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.delete(`${environment.apiUrl}v1/${code}/ticket_comments/delete/${id}`)
  }

  //TICKETS IMAGE
  uploadImageTicket(data: any): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.put(`${environment.apiUrl}v1/${code}/resources/uploads/Tickets`, data)
  }
  updateImageTicket(id: number, data: any): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.put(`${environment.apiUrl}v1/${code}/resources/uploads/Tickets/${id}`, data)
  }

  getUserDevices(): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.get(`${environment.apiUrl}v1/${code}/user_devices/get`)
  }

  // SHARED
  getFile(file: any): Observable<any> {
    let code = localStorage.getItem('code')
    return this.http.get(`${environment.apiUrl}v1/${code}/resources/uploads/Tickets/${file}`);
  }

}
