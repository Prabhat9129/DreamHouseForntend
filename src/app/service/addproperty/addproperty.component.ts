import { Component, OnInit } from '@angular/core';
import { Country, State, City } from 'country-state-city';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/auth/user.model';
import { PropertyService } from 'src/app/services/property.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.css'],
})
export class AddpropertyComponent implements OnInit {
  PropertyPicture: File;
  counter = 0;
  imageUrl: any;
  selectedCountry: string;
  selectedState: string;
  selectedCity: string;
  latitude: any;
  longitude: any;
  imgPath: string = '../../../assets/Clientassets/images/partners/ag-5.jpg';

  countries: any[];
  states: any[];
  cities: any[];
  userdata:User;

  constructor(private service:PropertyService,
    private spinner: NgxSpinnerService) {
    this.countries = Country.getAllCountries();
  }

  ngOnInit(): void {
    // this.service.user.subscribe((data)=>{
    //   console.log(data);
    //   this.userdata=data
    // })
  }

  onCountryChange() {
    this.selectedState = '';
    this.selectedCity = '';
    this.states = State.getStatesOfCountry(this.selectedCountry);
  }

  onStateChange() {
    this.selectedCity = '';
    this.cities = City.getCitiesOfState(
      this.selectedCountry,
      this.selectedState
    );
  }

  onCityChange() {
    let city = this.cities.filter((selectedCity) => {
      return selectedCity.name == this.selectedCity;
    });
    this.latitude = city
      .map((c) => {
        return c.latitude;
      })
      .join('');

    this.longitude = city
      .map((c) => {
        return c.longitude;
      })
      .join('');
  }

  onSubmit(forms: NgForm) {
    this.spinner.show();
    console.log(forms.form.value.title);
    this.service.addproperty(this.PropertyPicture,{
      title: forms.form.value.title,
      description: forms.form.value.description,
      status: forms.form.value.status,
      type: forms.form.value.type,
      rooms: forms.form.value.rooms,
      price: forms.form.value.price,
      area: forms.form.value.area,
      address: forms.form.value.address,
      country: forms.form.value.country,
      state:forms.form.value.state,
      city:forms.form.value.city,
      latitude:forms.form.value.latitude,
      longitude:forms.form.value.longitude,
      age:forms.form.value.age,
      bed:forms.form.value.bed,
      bath:forms.form.value.bath
    })
    
  }

  onChange(event: any) {
    this.counter++;
    const ext = event.target.files[0].type.split('/')[1];
    const extArr = ['jpeg', 'jpg', 'png'];
    if (event.target.files[0].name.length > 0 && extArr.includes(ext)) {
      const file = event.target.files[0];
      this.PropertyPicture = file;
      // console.log(this.ProfilePicture);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }
}
