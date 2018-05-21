import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private localSt: LocalStorageService) {}
  login_data;
  login(data){
    return this.http.post('https://rocky-wave-16596.herokuapp.com/login', data);
  }

  signup(data){
    return this.http.post('https://rocky-wave-16596.herokuapp.com/signup', data);
  }

  getUserByEnrollment(data){
    return this.http.get('https://rocky-wave-16596.herokuapp.com/useren/' + data);
  }
}
