import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizesService {

  constructor(private http: HttpClient) { }

  //EVALUATIONS
  getallEvaluations(code: string,): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/evaluations/get`);
  }
  getoneEvaluations(code: string, id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/evaluations/get/${id}`);
  }
  insertEvaluations(code: string, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}v1/${code}/evaluations/create`, data)
  }
  updateEvaluations(code: string, id: number, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/evaluations/update/${id}`, data)
  }
  deleteEvaluation(code: string, id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}v1/${code}/evaluations/delete/${id}`)
  }
  //EVALUATIONS COMMENTS
  getallEvaluationsComments(code: string,): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/evaluation_comments/get`);
  }
  getoneEvaluationsComments(code: string, id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/evaluation_comments/get/${id}`);
  }
  insertEvaluationsComments(code: string, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}v1/${code}/evaluation_comments/create`, data)
  }
  updateEvaluationsComments(code: string, id: number, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/evaluation_comments/update/${id}`, data)
  }
  deleteEvaluationComments(code: string, id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}v1/${code}/evaluation_comments/delete/${id}`)
  }
  //QUESTIONS
  getallQuestions(code: string,): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/questions/get`);
  }
  getoneQuestions(code: string, id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/questions/get/${id}`);
  }
  insertQuestions(code: string, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}v1/${code}/questions/create`, data)
  }
  updateQuestions(code: string, id: number, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/questions/update/${id}`, data)
  }
  deleteQuestions(code: string, id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}v1/${code}/questions/delete/${id}`)
  }
  //Answers
  getallAnswers(code: string,): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/answers/get`);
  }
  getoneAnswers(code: string, id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/answers/get/${id}`);
  }
  insertAnswers(code: string, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}v1/${code}/answers/create`, data)
  }
  updateAnswers(code: string, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/answers/update`, data)
  }
  deleteAnswers(code: string, id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}v1/${code}/answers/delete/${id}`)
  }
  //USER CALCULATORS
  getallUserCalculators(code: string,): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/evaluations/get`);
  }
  getoneUserCalculators(code: string, id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}v1/${code}/evaluations/get/${id}`);
  }
  insertUserCalculators(code: string, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}v1/${code}/evaluations/create`, data)
  }
  updateUserCalculators(code: string, id: number, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}v1/${code}/evaluations/update/${id}`, data)
  }
  deleteUserCalculators(code: string, id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}v1/${code}/evaluations/delete/${id}`)
  }
}
