import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerdata: any = { name: null, email: null, password: null, role: null };

  ngOnInit(): void {}

  constructor(
    private router: Router,
    private service: AuthServiceService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  onSubmit(forms: NgForm) {
    this.spinner.show();
    console.log(forms);
    this.registerdata.name = forms.form.value.name;
    this.registerdata.email = forms.form.value.email;
    this.registerdata.password = forms.form.value.password;
    this.registerdata.role = forms.form.value.role;
    const { name, email, password, role } = this.registerdata;

    let authObs = new Observable<AuthResponseData>();

    authObs = this.service.register({ name, email, password, role });

    authObs.subscribe(
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
}
