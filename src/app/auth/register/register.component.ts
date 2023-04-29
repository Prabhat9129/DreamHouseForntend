import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
// import { FormGroup } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {
  registerdata: any = { name: null, email: null, password: null, role: null };
  error: string = '';
  isRegistationSuccess = false;
  private subError: Subscription;

  ngOnInit(): void {
    this.subError = this.service.error.subscribe((errmessage) => {
      this.error = errmessage;
    });
  }

  constructor(
    private messageService: MessageService,
    private router: Router,
    private service: AuthServiceService
  ) {}

  onSubmit(forms: NgForm) {
    console.log(forms);
    this.registerdata.name = forms.form.value.name;
    this.registerdata.email = forms.form.value.email;
    this.registerdata.password = forms.form.value.password;
    this.registerdata.role = forms.form.value.role;
    const { name, email, password, role } = this.registerdata;

    this.service.register({ name, email, password, role });
    this.isRegistationSuccess = true;

    // this.router.navigate(['/login']);
  }
  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Registration successfully',
    });
  }
  ngOnDestroy() {
    this.subError.unsubscribe();
  }
}
