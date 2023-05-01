import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { MessageService } from 'primeng/api';
import { AuthServiceService } from '../auth-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  logindata: any = { email: null, password: null };
  isloggedin = false;
  constructor(private router: Router, private service: AuthServiceService) {}

  onSubmit(forms: NgForm) {
    console.log(forms);

    this.logindata.email = forms.form.value.email;
    this.logindata.password = forms.form.value.password;
    const { email, password } = this.logindata;
    this.service.login({ email, password });
    this.isloggedin = true;
    this.isloggedin = false;
    if (this.isloggedin) {
      this.router.navigate(['/home']);
    }
  }
}
