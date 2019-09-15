import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  insertKpi() {
    const kpiObject = { 'subsiteName': environment.subsiteName };
    this.http.post<any>(environment.webApiEndPoint, kpiObject);
  }
}
