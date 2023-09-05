
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  AuthServiceService } from '../auth-service.service';
import {  NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerdata: any = { name: null, email: null, password: null, role: null };
  @ViewChild('f', { static: false }) forms: NgForm
  invalidFormsClicked=false
  formHovered =false
  ngOnInit(): void {}

  constructor(  
    private service: AuthServiceService,
    private spinner:NgxSpinnerService,
    private toaster: ToastrService,
  ) {}
  showFormInvalidMessage(){
    if(this.forms.invalid){
      this.invalidFormsClicked=true
      this.formHovered =true
          }
  }

  
  onSubmit() {
    
    if(this.forms.valid){
      this.spinner.show();
      console.log(this.forms);
      this.registerdata.name = this.forms.form.value.name;
      this.registerdata.email = this.forms.form.value.email;
      this.registerdata.password = this.forms.form.value.password;
      this.registerdata.role = this.forms.form.value.role;
      const { name, email, password, role } = this.registerdata;

      this.service.register({ name, email, password, role });

    }
    else
    {
      
      console.log("form is not valid")

      const emptyFields = Object.keys(this.forms.controls).filter(
        (key) => this.forms.controls[key].errors?.['required']
        
      );
      
      if (emptyFields.length > 0) {
        const errorMessage = `Please fill in the following fields: ${emptyFields.join(', ')}`;
        this.toaster.success("please fill all field", "invalid form");
        // Show the error message or take appropriate action
      }
    }
  }
}
