import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ModernService {
  constructor(
    private apiService: ApiService
  ) { }
  getModern(): Observable<any> {
    return this.apiService.get(`modern`);
  }
  addModern (data): Observable<any> {
    return this.apiService.post('modern', data);
  }
  updateModern(id: string, data): Observable<any> {
    return this.apiService.put('modern/' + id, data);
  }
  deleteModern(id: string): Observable<any> {
    return this.apiService.delete('modern/' + id);
  }
  
}
