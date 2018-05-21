import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  sendPost(data){
    return this.http.post('https://rocky-wave-16596.herokuapp.com/postit', data);
  }

  getPost(){
    return this.http.get('https://rocky-wave-16596.herokuapp.com/posts');
  }
}
