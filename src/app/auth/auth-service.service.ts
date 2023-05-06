import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { post, log, updatepassword } from './post.model';
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
  }

  login({ email, password }: log) {
    const logdata: log = {
      email: email,
      password: password,
    };
    return this.http.post<any>('http://localhost:8000/signin', logdata);
  }

  //Retrieve the token from local storage

  updatepassword({ currentpassword, newpassword, conformpassword }: any) {
    const updatepass: updatepassword = {
      currentpassword: currentpassword,
      newpassword: newpassword,
      conformpassword: conformpassword,
    };
    let token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    return this.http.patch('http://localhost:8000/PasswordUpadte', updatepass, {
      headers,
    });
  }

  forgotpassword({ email }: any) {
    console.log(email);
    const useremail: any = { email: email };
    console.log(useremail);
    return this.http.post('http://localhost:8000/forgotpassword', useremail);
  }

  resetpassword({ newpassword, conformpassword, token }: any) {
    const resetdata: any = {
      newpassword: newpassword,
      conformpassword: conformpassword,
      token: token,
    };
    // const token=token
    return this.http.patch(
      `http://localhost:8000/resetpassword/${resetdata.token}`,
      resetdata
    );
  }
}
