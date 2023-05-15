import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { post, log, updatepassword, updateProfile } from './post.model';
import { environment } from 'src/environments/environment';

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
private  apiurl=environment.API_URL

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

    return this.http.post<any>(`${this.apiurl}/signup`, postdata);
  }

  login({ email, password }: log) {
    const logdata: log = {
      email: email,
      password: password,
    };
    return this.http.post<any>(`${this.apiurl}/signin`, logdata);
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
      `${this.apiurl}/${resetdata.token}`,
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
  }

  getstatecity() {
    return this.http.get(`${this.apiurl}/countrystate`, );
  }

  isLoggedIn():boolean{
const token =localStorage.getItem('token')
if(token){
  return true
}
else{
  return false
}
  }


  getUser(){
    this.http.get(`${this.apiurl}/getuser`).subscribe(
      (responsedata)=>{
        console.log(responsedata)
      },
      (err)=>{
        console.log(err)
      }
    )
  }
}
