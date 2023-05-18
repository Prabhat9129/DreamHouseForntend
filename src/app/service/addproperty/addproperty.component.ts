import { Component, OnInit } from '@angular/core';
import { Country, State, City } from 'country-state-city';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.css'],
})
export class AddpropertyComponent implements OnInit {
  selectedCountry: string;
  selectedState: string;
  selectedCity: string;
  latitude: any;
  longitude: any;
  imgPath: string = '../../../assets/Clientassets/images/partners/ag-5.jpg';

  countries: any[];
  states: any[];
  cities: any[];
  constructor() {
    this.countries = Country.getAllCountries();
  }

  ngOnInit(): void {}

  onCountryChange() {
    // console.log(this.selectedCountry);
    this.selectedState = '';
    this.selectedCity = '';

    this.states = State.getStatesOfCountry(this.selectedCountry);
    // console.log(this.states);
  }

  onStateChange() {
    this.selectedCity = '';

    this.cities = City.getCitiesOfState(
      this.selectedCountry,
      this.selectedState
    );
  }

  onCityChange() {
    // console.log(this.selectedCity);

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
    // console.log(this.latitude, this.longitude);
  }

  onSubmit(forms: NgForm) {
    console.log(forms);
  }
}
