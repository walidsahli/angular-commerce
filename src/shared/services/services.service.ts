import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { registerForm } from '../interfaces/registerForm';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl : string = environment.baseUrl

  constructor(private http : HttpClient) { }

  Register(form : registerForm): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/auth/register`, form)
  }
}
