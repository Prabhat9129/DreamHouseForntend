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
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

export interface AuthResponseData {
  status: string;
  statuscode: number;
  message: string;
  utoken?: string;
  user?: {};
}

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiurl = environment.API_URL;

  // private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  // public data$: Observable<any> = this.dataSubject.asObservable();
  roles:string="";
  user = new Subject<User>();
  isLogged = new BehaviorSubject<boolean>(this.isLoggedIn());
  role = new BehaviorSubject<string>('');

  // isLoggedin = new BehaviorSubject<any>(this.getUser());
  // error = new Subject<any>(); 
 
  constructor(private http: HttpClient,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService) {}

  register({ name, email, password, role }: post) {
    const postdata: post = {
      name: name,
      email: email,
      password: password,
      role: role,
    };

    return this.http.post<AuthResponseData>(`${this.apiurl}/signup`, postdata).subscribe(
      (resdata) => {
        console.log(resdata);
        this.toaster.success(resdata.message, resdata.status);
        this.spinner.hide();
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
        this.toaster.error(err.error.message, err.error.status);
        this.spinner.hide();
      }
    );
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
      ).subscribe(
        (resdata) => {
          console.log(resdata);
          console.log(resdata.user.role);
          const userData = {
            token: resdata?.utoken,
            user: resdata?.user,
          };
          if (resdata.utoken !== null) {
            localStorage.setItem('token',JSON.stringify(userData.token));
            this.toaster.success(resdata.message, resdata.status);
            this.spinner.hide();
            console.log(userData.user.role);
            this.roles=userData.user.role;
            this.role.next(userData.user.role);
            this.isLogged.next(true);
            if(userData.user.role==="admin"){
              console.log(userData.user.role);
              console.log(userData.user.role);
              console.log(userData.user.role);
              this.router.navigate(['/admin']);
            }
            else{
              console.log(userData.user.role);
              console.log(userData.user.role);
              this.router.navigate(['/home']);
            }
          }
        },
        (err) => {
          console.log(err);
          this.toaster.error(err.error.message, err.error.status);
          this.spinner.hide();
        }
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

    return this.http.patch(`${this.apiurl}/updateProfile`, formData)
    .pipe(
      catchError(this.handleError),
      tap((resData: any) => {
        console.log(resData.updatedata);
        const {
          email,
          name,
          role,
          contact,
          gender,
          city,
          pincode,
          address,
          profileImg,
        } = resData.updatedata;

        this.handleAuthentication(
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
      })
    ).subscribe(
      (resdata) => {
        console.log(resdata);
        const userData = {
          user: resdata?.updatedata,
        };
        if (resdata.utoken !== null) {  
          localStorage.setItem('userData', JSON.stringify(userData.user));
          const user = new User(
            userData.user.email,
            userData.user.name,
            userData.user.role,
            userData.user.number,
            userData.user.gender,
            userData.user.city_id,
            userData.user.pincode,
            userData.user.address,
            userData.user.profileImg
          );
          // this.user.next(user);
          this.toaster.success(resdata.message, resdata.status);
          this.spinner.hide();
          this.router.navigate(['/home']);
        }
      },
      (err) => {
        console.log(err);
        this.toaster.error(err.error.message, err.error.status);
        this.spinner.hide();
      }
    );
  }

  isLoggedIn(): boolean {
  return  localStorage.getItem('token') !== null;
  }
  // fetchData(): Observable<any> {
  //   return this.http.get<any>(`${this.apiurl}/getuser`).pipe(
  //     tap(data => this.dataSubject.next(data))
  //   );
  // }

  getUser() {
    return this.http.get<AuthResponseData>(`${this.apiurl}/getuser`)
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
      // })
    // );
  }

  getdata() {
    return this.user.asObservable();
  }
  private handleAuthentication(
    name: string,
    email: string,
    role: string,
    number?: number | undefined,
    gender?: string | undefined,
    city_id?: string | undefined,
    pincode?: number | undefined,
    address?: string | undefined,
    profileImg?: string | undefined
  ) {
    const user = new User(
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
    this.user.next(user);
  }

  private handleError(errRes: HttpErrorResponse) {
    return throwError(errRes);
  }
}
