import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  token:any;

  API_URL = 'http://localhost:8000/api';

  TOKEN_KEY = 'token';

  constructor(private http: HttpClient) { }

  getData(data){
    let dataStorage=JSON.parse(localStorage.getItem(this.TOKEN_KEY));
     this.token=dataStorage.access_token;
    return this.http.post(this.API_URL + '/transaction', data, {headers : {Authorization: `Bearer ${this.token}`}}).subscribe({
      next: data => {
          console.log(data)
      },
      error: error => {
          console.error('There was an error!', error);
      }
  });
  }
}

