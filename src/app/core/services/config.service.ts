import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiURIL: String;

  constructor(private http: HttpClient) {
    this.apiURIL = environment.api;
  }

  getConfig(enpoint: String) {
    return this.http.get(`${ this.apiURIL }/${ enpoint }`);
  }

}
