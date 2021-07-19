import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KasirService {

  API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(this.API_URL + '/items');
  }
}
