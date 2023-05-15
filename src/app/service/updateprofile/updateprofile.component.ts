import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { CanComponentDeactivate } from './can-deactivate-gaurd.service';
import * as cloudinary from 'cloudinary-core';

import { response } from 'src/app/auth/post.model';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css'],
})
export class UpdateprofileComponent implements OnInit, CanComponentDeactivate {
  ProfilePicture: File;
  imageUrl: any;
  counter = 0;
  changeSaved = false;
  name: string;
  email: string;
  url: string;

  constructor(
    private router: Router,
    private service: AuthServiceService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    const cloudinaryCore = new cloudinary.Cloudinary({
      cloud_name: 'dz9zindot',
      api_key: '974952477946219',
      api_secret: 'tHnJv1OEwD0dJPuLLNuTWDsDERs',
    });
    // cloudinaryCore.fetch_image(`${this.url}`);

    this.service.getUser().subscribe(
      (res: any) => {
        if (res) {
          console.log(res.userdata);
          this.name = res.userdata.name;
          this.email = res.userdata.email;
          this.url = res.userdata.profileImg;
          this.updateuser.setValue({
            name: res.userdata.name,
            number: res.userdata.number,
            gender: res.userdata.gender,
            address: res.userdata.address,
            city_id: res.userdata.city_id,
            pincode: res.userdata.pincode,
            profileImg: null,
          });
          console.log(this.updateuser);
        }
      },
      (err) => {
        console.log(err);
      }
    );

    this.updateuser.patchValue({
      name: this.name,
    });

    const imageUrl = cloudinaryCore.url(`${this.url}`, {
      width: 500,
      height: 500,
      crop: 'fill',
      secure: true,
    });
    console.log(imageUrl, this.url);
    // this.url = imageUrl;

    this.service.getstatecity().subscribe(
      (resdata) => {
        console.log(resdata);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateuser = new FormGroup({
    name: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city_id: new FormControl('', Validators.required),
    pincode: new FormControl('', Validators.required),
    profileImg: new FormControl('', Validators.required),
  });

  updateUser() {
    console.log(this.updateuser);

    let authObs: Observable<any>;
    const {
      name,
      email,
      password,
      role,
      number,
      gender,
      address,
      city_id,
      pincode,
    }: any = this.updateuser.value;

    authObs = this.service.updateprofile(this.ProfilePicture, {
      name: name,
      email: email,
      password: password,
      role: role,
      number: number,
      gender: gender,
      address: address,
      city_id: city_id,
      pincode: pincode,
    });

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

  onChange(event: any) {
    this.counter++;
    const ext = event.target.files[0].type.split('/')[1];
    const extArr = ['jpeg', 'jpg', 'png'];
    if (event.target.files[0].name.length > 0 && extArr.includes(ext)) {
      const file = event.target.files[0];
      this.ProfilePicture = file;
      console.log(this.ProfilePicture);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return false;
  }
}
