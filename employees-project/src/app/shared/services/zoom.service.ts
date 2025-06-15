import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

 private baseUrl = 'http://localhost:5139/api/Zoom'; 

  constructor(private http: HttpClient) {}

  createMeeting() {
    return this.http.get<any>(`${this.baseUrl}/createmeeting`);
  }
}
