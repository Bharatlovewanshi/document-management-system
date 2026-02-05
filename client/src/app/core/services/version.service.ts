import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  private readonly API_URL = `${environment.apiBaseUrl}/documents`;
  constructor(private http: HttpClient) {}

  
  getVersions(documentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/${documentId}`);
  }

  
  getVersion(
    documentId: string,
    version: number
  ): Observable<any> {
    return this.http.get(
      `${this.API_URL}/${documentId}/${version}`
    );
  }

  //Restore a document to a previous version
  
  restoreVersion(
    documentId: string,
    version: number
  ): Observable<any> {
    return this.http.post(
      `${this.API_URL}/${documentId}/${version}/restore`,
      {}
    );
  }
}
