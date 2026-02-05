import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) {}

   // Register user
  register(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    console.log("Client Register 1");
    console.log(data);
    console.log(this.API_URL);
    return this.http.post(`${this.API_URL}/register`, data);
  }

  
  login(data: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, data).pipe(
      tap((res: any) => {
  
        //console.log(res.data.token);
        //console.log('USER:', res.data.user);

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      })
    );
  }

  
  getProfile(): Observable<any> {
    return this.http.get(`${this.API_URL}/me`);
  }

  // Logout user
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Check login state
   
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get current user from storage
   
  getCurrentUser(): any {
    const user = localStorage.getItem('user');

    if (!user || user === 'undefined') {
      return null;
    }

    try {
      return JSON.parse(user);
    } catch (error) {
      console.error('Invalid user JSON in localStorage:', user);
      localStorage.removeItem('user');
      return null;
    }
  }


  // Get current user role
   
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user?.role || null;
  }

}
