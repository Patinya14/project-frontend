import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class LoginService {
  constructor(
    private apiService: ApiService
  ) { }
  getlog(): Observable<any> {
    return this.apiService.get(`login`);
  }
  addlog (data): Observable<any> {
    return this.apiService.post('login', data);
  }
  updatelog(id: string, data): Observable<any> {
    return this.apiService.put('login/' + id, data);
  }
  deletelog(id: string): Observable<any> {
    return this.apiService.delete('login/' + id);
  }
  
}
