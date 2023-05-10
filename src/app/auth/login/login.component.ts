import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthResponseData, AuthServiceService } from '../auth-service.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  logindata: any = { email: null, password: null };
  isError = false;
  isLoading = false;

  constructor(
    private router: Router,
    private service: AuthServiceService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  onSubmit(forms: NgForm) {
    this.spinner.show();
    console.log(forms);

    this.logindata.email = forms.form.value.email;
    this.logindata.password = forms.form.value.password;
    const { email, password } = this.logindata;

    let authObs: Observable<AuthResponseData>;

    authObs = this.service.login({ email, password });

    authObs.subscribe(
      (resdata) => {
        console.log(resdata.user);
        if (resdata.utoken !== null) {
          localStorage.setItem('token', `Bearer ${resdata.utoken}`);
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
}
