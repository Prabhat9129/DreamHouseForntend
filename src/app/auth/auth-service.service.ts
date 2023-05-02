import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { post, log } from './post.model';
import { Subject } from 'rxjs';

export interface AuthResponseData {
  status: string;
  statuscode: number;
  message: string;
  utoken: string;
  user?: {};
}

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  user = new Subject<any>();
  error = new Subject<any>();
  data = this.user.asObservable();
  constructor(private http: HttpClient) {}

  register({ name, email, password, role }: post) {
    const postdata: post = {
      name: name,
      email: email,
      password: password,
      role: role,
    };

    return this.http.post<any>('http://localhost:8000/signup', postdata);
    // .subscribe(
    //   (responsedata) => {
    //     console.log(responsedata);
    //     const dataWithMessage = {
    //       data: responsedata.user,
    //       message: responsedata.message,
    //     };

    //     this.user.next(dataWithMessage);
    //   },
    //   (err) => {
    //     console.log(err);
    //     if (err.error.status === 'Error') {
    //       this.error.next(err.error.message);
    //     } else if (err.error) {
    //       this.error.next(err.error);
    //     } else {
    //       this.error.next('Unknow Error!');
    //     }
    //   }
    // );
  }

  login({ email, password }: log) {
    const logdata: log = {
      email: email,
      password: password,
    };
    return this.http.post<any>('http://localhost:8000/signin', logdata);
  }
}
