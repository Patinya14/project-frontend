import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class AppointmentsService {
  constructor(
    private apiService: ApiService
  ) { }
  getApp(): Observable<any> {
    return this.apiService.get(`appointments`);
  }
  addApp(data): Observable<any> {
    return this.apiService.post('appointments', data);
  }
  updateApp(id: string, data): Observable<any> {
    return this.apiService.put('appointments/' + id, data);
  }
  deleteApp(id: string): Observable<any> {
    return this.apiService.delete('appointments/' + id);
  }
  
}