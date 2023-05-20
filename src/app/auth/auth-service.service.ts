import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { post, log, updatepassword, updateProfile } from './post.model';
import { environment } from 'src/environments/environment';

import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import { User } from './user.model';

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
  private apiurl = environment.API_URL;

  private user = new Subject<User>();
  isLoggedin = new BehaviorSubject<any>(this.getUser());
  error = new Subject<any>();

  constructor(private http: HttpClient) {}

  register({ name, email, password, role }: post) {
    const postdata: post = {
      name: name,
      email: email,
      password: password,
      role: role,
    };

    return this.http.post<AuthResponseData>(`${this.apiurl}/signup`, postdata);
  }

  login({ email, password }: log) {
    const logdata: log = {
      email: email,
      password: password,
    };
    return this.http
      .post<AuthResponseData>(`${this.apiurl}/signin`, logdata)
      .pipe(
        catchError(this.handleError),
        tap((resData: any) => {
          // console.log(resData.user);
          const {
            email,
            name,
            role,
            number,
            gender,
            city_id,
            pincode,
            address,
            profileImg,
          } = resData.user;

          this.handleAuthentication(
            email,
            name,
            role,
            number,
            gender,
            city_id,
            pincode,
            address,
            profileImg
          );
        })
      );
  }

  updatepassword({ currentpassword, newpassword, conformpassword }: any) {
    const updatepass: updatepassword = {
      currentpassword: currentpassword,
      newpassword: newpassword,
      conformpassword: conformpassword,
    };

    return this.http.patch(`${this.apiurl}/PasswordUpadte`, updatepass);
  }

  forgotpassword({ email }: any) {
    const useremail: any = { email: email };
    console.log(useremail);
    return this.http.post(`${this.apiurl}/forgotpassword`, useremail);
  }

  resetpassword({ newpassword, conformpassword, token }: any) {
    const resetdata: any = {
      newpassword: newpassword,
      conformpassword: conformpassword,
      token: token,
    };

    return this.http.patch(
      `${this.apiurl}/resetpassword/${resetdata.token}`,
      resetdata
    );
  }

  updateprofile(file: File, user: any) {
    const formData = new FormData();
    formData.append('profileImg', file);
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('role', user.role);
    formData.append('number', user.number);
    formData.append('address', user.address);
    formData.append('city_id', user.city_id);
    formData.append('gender', user.gender);
    formData.append('pincode', user.pincode);

    return this.http.patch(`${this.apiurl}/updateProfile`, formData);
    // .pipe(
    //   catchError(this.handleError),
    //   tap((resData: any) => {
    //     // console.log(resData.user);
    //     const {
    //       email,
    //       name,
    //       role,
    //       contact,
    //       gender,
    //       city,
    //       pincode,
    //       address,
    //       profileImg,
    //     } = resData.user;

    //     this.handleAuthentication(
    //       email,
    //       name,
    //       role,
    //       contact,
    //       gender,
    //       city,
    //       pincode,
    //       address,
    //       profileImg
    //     );
    //   })
    // );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  getUser() {
    return this.http.get(`${this.apiurl}/getuser`);
    // .pipe(
    //   catchError(this.handleError),
    //   tap((resData: any) => {
    //     console.log(resData.user);
    //     const {
    //       email,
    //       name,
    //       role,
    //       contact,
    //       gender,
    //       city,
    //       pincode,
    //       address,
    //       profileImg,
    //     } = resData.user;

    //     this.handleAuthentication(
    //       email,
    //       name,
    //       role,
    //       contact,
    //       gender,
    //       city,
    //       pincode,
    //       address,
    //       profileImg
    //     );
    //   })
    // );
  }

  getdata() {
    return this.user.asObservable();
  }
  private handleAuthentication(
    name: string,
    email: string,
    role: string,
    contact?: number | undefined,
    gender?: string | undefined,
    city?: string | undefined,
    pincode?: number | undefined,
    address?: string | undefined,
    profileImg?: string | undefined
  ) {
    const user = new User(
      email,
      name,
      role,
      contact,
      gender,
      city,
      pincode,
      address,
      profileImg
    );
    this.user.next(user);
  }

  private handleError(errRes: HttpErrorResponse) {
    return throwError(errRes);
  }
}
