import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { post, log } from './post.model';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private user = new Subject<any>();
  error = new Subject<any>();
  data = this.user.asObservable();
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  register({ name, email, password, role }: post) {
    const postdata: post = {
      name: name,
      email: email,
      password: password,
      role: role,
    };

    this.http.post<any>('http://localhost:8000/signup', postdata).subscribe(
      (responsedata) => {
        console.log(responsedata);
        const dataWithMessage = {
          data: responsedata.user,
          message: responsedata.message,
        };
        // this.toastr.success(responsedata.message);
        this.user.next(dataWithMessage);
      },
      (err) => {
        console.log(err);
        if (err.error.status === 'Error') {
          // this.toastr.error(err.error.message);
          this.error.next(err.error.message);
        } else if (err.error) {
          // this.toastr.error(err.error);
          this.error.next(err.error);
        } else {
          // this.toastr.error('Unknow Error!');
          this.error.next('Unknow Error!');
        }
      }
    );
  }

  login({ email, password }: log) {
    const logdata: log = {
      email: email,
      password: password,
    };

    this.http.post<any>('http://localhost:8000/signin', logdata).subscribe(
      (responsedata) => {
        console.log(responsedata);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
