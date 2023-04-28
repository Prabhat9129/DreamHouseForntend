import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  error = new Subject<string>();
  constructor(private http: HttpClient) {}

  register({ name, email, password, role }: post) {
    const postdata: post = {
      name: name,
      email: email,
      password: password,
      role: role,
    };

    this.http.post<post>('http://localhost:8000/signup', postdata).subscribe(
      (responsedata) => {
        console.log(responsedata);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
