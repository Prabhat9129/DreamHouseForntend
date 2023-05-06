import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
})
export class ResetpasswordComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthServiceService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  resetform = new FormGroup({
    newpassword: new FormControl(''),
    conformpassword: new FormControl(''),
  });

  onSubmit() {
    const token = this.route.snapshot.params['token'];
    console.log(token);
    console.log(this.resetform);
    const { newpassword, conformpassword } = this.resetform.value;

    let authObs: Observable<any>;
    authObs = this.service.resetpassword({
      newpassword,
      conformpassword,
      token,
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
