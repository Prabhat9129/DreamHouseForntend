import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerdata: any = { name: null, email: null, password: null, role: null };
  error: string = '';
  user: any = {};
  isRegistationSuccess = false;
  isLoading = false;
  private subError: Subscription;

  ngOnInit(): void {
    this.service.data.subscribe((userdata) => {
      this.user = userdata;
    });
    this.subError = this.service.error.subscribe((errmessage) => {
      this.error = errmessage;
    });
  }

  constructor(private router: Router, private service: AuthServiceService) {}

  onSubmit(forms: NgForm) {
    console.log(forms);
    this.registerdata.name = forms.form.value.name;
    this.registerdata.email = forms.form.value.email;
    this.registerdata.password = forms.form.value.password;
    this.registerdata.role = forms.form.value.role;
    this.isLoading = true;
    const { name, email, password, role } = this.registerdata;
    this.service.register({ name, email, password, role });
    this.isRegistationSuccess = true;
    if (this.isRegistationSuccess) {
    }

    this.isLoading = false;
    // this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subError.unsubscribe();
  }
}
