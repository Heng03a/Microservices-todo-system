import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface LoginResponse {
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

login(credentials: { email: string; password: string }): Observable<LoginResponse> {
  return this.http
    .post<LoginResponse>(`${this.apiUrl}/api/auth/login`, {
      username: credentials.email,
      password: credentials.password
    })
    .pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
