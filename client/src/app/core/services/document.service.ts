import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private readonly API_URL = `${environment.apiBaseUrl}/documents`;

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  uploadDocument(formData: FormData): Observable<any> {
    return this.http.post(`${this.API_URL}/upload`, formData);
  }

  getDocumentById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  editDocument(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, formData);
  }
}
