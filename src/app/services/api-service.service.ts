import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }


  sendMailRoute(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}send/route/signed`, data, {})
  }

  resetPassword(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${data.token}`
    });
    return this.http.post<any>(`${environment.apiUrl}reset-password`, data, { headers })
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}users`, {})
  }

  profile(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}me`,{});
  }

  addUser(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}users`, data, {})
  }

  updateUser(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}users/${data.id}`, data, {})
  }

  deleteUser(data: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}users/${data.id}`, {})
  }

  getRoles(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}roles`, {})
  }

  addRole(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}roles`, data, {})
  }

  updateRole(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}roles/${data.id}`, data, {})
  }

  deleteRole(data: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}roles/${data.id}`, {})
  }

  getViews(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}views`, {})
  }

  addView(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}views`, data, {})
  }

  updateView(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}views/${data.id}`, data, {})
  }

  deleteView(data: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}views/${data.id}`, {})
  }

  getRoleViews(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}roleViews`, {})
  }

  getRoleViewUser(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}roleViews/1`, {})
  }

  addRoleView(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}roleViews`, data, {})
  }

  getGrades(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}grades`, {})
  }

  addGrade(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}grades`, data, {})
  }

  updateGrade(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}grades/${data.id}`, data, {})
  }

  deleteGrade(data: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}grades/${data.id}`, {})
  }

  getSections(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}sections`, {})
  }

  addSection(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}sections`, data, {})
  }

  updateSection(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}sections/${data.id}`, data, {})
  }

  deleteSection(data: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}sections/${data.id}`, {})
  }

  getGroups(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}groups`, {})
  }

  addGroup(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}groups`, data, {})
  }

  updateGroup(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}groups/${data.id}`, data, {})
  }

  deleteGroup(data: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}groups/${data.id}`, {})
  }

  getEducationLevels(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}education/levels`, {})
  }

  addEducationLevel(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}education/levels`, data, {})
  }

  updateEducationLevel(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}education/levels/${data.id}`, data, {})
  }

  deleteEducationLevel(data: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}education/levels/${data.id}`, {})
  }

  getLessons(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}lessons`, {})
  }

  addLesson(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}lessons`, data, {})
  }

  updateLesson(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}lessons/${data.id}`, data, {})
  }

  deleteLesson(data: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}lessons/${data.id}`, {})
  }

  getQuetions(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}questions`, {})
  }

  addQuetion(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}questions`, data, {})
  }

  updateQuetion(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}questions/${data.id}`, data, {})
  }

  deleteQuetion(data: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}questions/${data.id}`, {})
  }

  getTests(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}tests`, {})
  }

  addTest(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}tests`, data, {})
  }

  updateTest(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}tests/${data.id}`, data, {})
  }

  deleteTest(data: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}tests/${data.id}`, {})
  }

  getTestsQuestions(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}testQuestions`, {})
  }

  addTestQuestions(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}testQuestions`, data, {})
  }

  updateTestQuestions(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}testQuestions/${data.id}`, data, {})
  }

  deleteTestQuestions(data: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}testQuestions/${data.id}`, {})
  }

}
