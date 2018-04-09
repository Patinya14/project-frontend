import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class SummaryService {
  constructor(
    private apiService: ApiService
  ) { }
  getSummary(): Observable<any> {
    return this.apiService.get(`summarySick`);
  }
  addSummary (data): Observable<any> {
    return this.apiService.post('summarySick', data);
  }
  updateSummary(id: string, data): Observable<any> {
    return this.apiService.put('summarySick/' + id, data);
  }
  deleteSummary(id: string): Observable<any> {
    return this.apiService.delete('summarySick/' + id);
  }
  
}
