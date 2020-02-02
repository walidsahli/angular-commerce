import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { registerForm } from '../interfaces/registerForm';
import { environment } from '../../environments/environment'
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { loginForm } from '../interfaces/loginForm';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl: string = environment.baseUrl
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    setTimeout( () => this.loggedIn.next(localStorage.getItem("token") ? true : false),100)
  }

  Register(form: registerForm): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, form)
  }

  Login(form: loginForm): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, form)
  }
}
