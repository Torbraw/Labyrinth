import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  insertKpi() {
    const kpiObject = { 'subsiteName': environment.subsiteName };
    this.http.post(environment.webApiEndPoint + environment.kpiEndPoint, kpiObject, { responseType: 'text' }).subscribe();
  }
}
