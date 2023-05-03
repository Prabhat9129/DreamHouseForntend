import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css'],
})
export class UpdatepasswordComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private service: AuthServiceService) {}

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
    console.log(this.passwordform);
    this.service.updatepassword();
  }
}
