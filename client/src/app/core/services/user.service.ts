import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_URL = `${environment.apiBaseUrl}/documents`;

  constructor(private http: HttpClient) {}

  
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${userId}`);
  }


  updateUserRole(
    userId: string,
    role: string
  ): Observable<any> {
    return this.http.put(
      `${this.API_URL}/${userId}/role`,
      { role }
    );
  }


  updateUserStatus(
    userId: string,
    isActive: boolean
  ): Observable<any> {
    return this.http.put(
      `${this.API_URL}/${userId}/status`,
      { isActive }
    );
  }


  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${userId}`);
  }
}
