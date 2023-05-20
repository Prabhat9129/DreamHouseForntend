import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent {
  constructor(
    private router: Router,
    private service: AuthServiceService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  onSubmit(forms: NgForm) {
    this.spinner.show();
    // console.log(forms.form.value.email);
    const email = forms.form.value.email;
    let authObs: Observable<any>;

    authObs = this.service.forgotpassword({ email });
    authObs.subscribe(
      (resdata) => {
        // console.log(resdata);
        if (resdata.utoken !== null) {
          // localStorage.setItem('token', `Bearer ${resdata.utoken}`);
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
