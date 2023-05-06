import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponseData, AuthServiceService } from '../auth-service.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css'],
})
export class UpdatepasswordComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    private router: Router,
    private service: AuthServiceService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  passwordform = new FormGroup({
    currentpassword: new FormControl('', Validators.required),
    newpassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      ),
    ]),
    conformpassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      ),
    ]),
  });

  onSubmit() {
    if (
      this.passwordform.value.newpassword !==
      this.passwordform.value.conformpassword
    ) {
      this.passwordform.setErrors({ mismatch: true });
      return;
    }
    console.log(this.passwordform.value);
    const { currentpassword, newpassword, conformpassword } =
      this.passwordform.value;

    let authObs: Observable<any>;
    authObs = this.service.updatepassword({
      currentpassword,
      newpassword,
      conformpassword,
    });

    authObs.subscribe(
      (resdata) => {
        console.log(resdata);

        if (resdata.utoken !== null) {
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
