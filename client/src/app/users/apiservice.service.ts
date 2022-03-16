import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  constructor(private http: HttpClient) {}

  // base endpoint
  apiUrl = 'http://localhost:3000/api';

  // signup
  signUp(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  // login
  logIn(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // tutorial
  tutorial(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tutorial`);
  }
  // getToken
  getToken() {
    return localStorage.getItem('token');
  }
}
