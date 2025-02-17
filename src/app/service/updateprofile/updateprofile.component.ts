import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { CanComponentDeactivate } from './can-deactivate-gaurd.service';
import { Country, State, City } from 'country-state-city';
import { response } from 'src/app/auth/post.model';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css'],
})
export class UpdateprofileComponent implements OnInit, CanComponentDeactivate {
  ProfilePicture: File;
  imageUrl: any;
  selectedCountry: any;
  selectedState: any;
  selectedCity: string;
  counter = 0;
  changeSaved = false;
  name: string;
  email: string;
  url: string;
  countries: any[];
  states: any[];
  cities: any[];

  constructor(
    private router: Router,
    private service: AuthServiceService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.countries = Country.getAllCountries();
  }
  ngOnInit(): void {
    this.service.getUser().subscribe(
      (res: any) => {
        if (res) {
          // console.log(res.userdata);
          this.name = res.userdata.name;
          this.email = res.userdata.email;
          this.url = res.userdata.profileImg;
          this.updateuser.patchValue({
            name: res.userdata.name,
            number: res.userdata.number,
            gender: res.userdata.gender,
            address: res.userdata.address,
            city_id: res.userdata.city_id,
            pincode: res.userdata.pincode,
            profileImg: null,
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateuser = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z]*')]),
    number: new FormControl('', [Validators.required,Validators.pattern('[0-9]{10}')]),
    gender: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    selectCS: new FormGroup({
      selectedCountry: new FormControl('',Validators.required),
      selectedState: new FormControl('',Validators.required),
    }),
    city_id: new FormControl('', Validators.required),
    pincode: new FormControl('', [Validators.required,Validators.pattern('[0-9]{6}')]),
    profileImg: new FormControl('', Validators.required),
  });

  updateUser() {
    this.spinner.show();
    // console.log(this.updateuser);
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

    this.service.updateprofile(this.ProfilePicture, {
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
  }

  onChange(event: any) {
    this.counter++;
    const ext = event.target.files[0].type.split('/')[1];
    const extArr = ['jpeg', 'jpg', 'png'];
    if (event.target.files[0].name.length > 0 && extArr.includes(ext)) {
      const file = event.target.files[0];
      this.ProfilePicture = file;
      // console.log(this.ProfilePicture);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }

  onCountryChange() {
    const selectedCountry = this.updateuser.get('selectCS.selectedCountry');
    this.selectedCountry = selectedCountry?.value;
    console.log(selectedCountry?.value);
    this.states = State.getStatesOfCountry(`${this.selectedCountry}`);
    console.log(this.selectedCountry, this.states);
  }

  onStateChange() {
    const selectedState = this.updateuser.get('selectCS.selectedState');
    this.selectedState = selectedState?.value;
    this.cities = City.getCitiesOfState(
      `${this.selectedCountry}`,
      `${this.selectedState}`
    );
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return false;
  }
}
