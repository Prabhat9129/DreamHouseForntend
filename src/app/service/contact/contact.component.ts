import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  buttonClicked: boolean = false;

  contactform = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('[a-zA-Z]*'),
    ]),
    email: new FormControl('',[ Validators.required,Validators.email]),
    number: new FormControl('',[ Validators.required,Validators.pattern('[0-9]{10}')]),
    reference: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });

  onSubmit() {
    console.log(this.contactform);
    if(this.contactform.invalid){
this.contactform.markAllAsTouched();
return
    }
    else{

    }
    this.buttonClicked=true
  }
}
