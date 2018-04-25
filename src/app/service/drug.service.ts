import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class  MedicineService {
  constructor(
    private apiService: ApiService
  ) { }
  getdrug(): Observable<any> {
    return this.apiService.get(`medicine`);
  }
  getdrugById(id): Observable<any> {
    return this.apiService.get(`medicine/` + id);
  }
  adddrug(data): Observable<any> {
    return this.apiService.post('Medicine', data);
  }
  updatedrug(id: string, data): Observable<any> {
    return this.apiService.put('medicine/' + id, data);
  }
  deletedrug(id: string): Observable<any> {
    return this.apiService.delete('medicine/' + id);
  }
  
}
