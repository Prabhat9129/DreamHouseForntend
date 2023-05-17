import { Component, OnInit } from '@angular/core';
import { Country, State, City } from 'country-state-city';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.css'],
})
export class AddpropertyComponent implements OnInit {
  selectedCountry: string;
  selectedState: string;
  selectedCity: string;

  countries: Country[];
  states: State[];
  cities: City[];

  ngOnInit(): void {
    this.countries = Country.getAll();
    this.states = State.getStatesOfCountry(countryId);

    this.cities = City.getCitiesOfState(stateId);
  }

  onCountryChange() {
    // Reset state and city dropdowns
    this.selectedState = null;
    this.selectedCity = null;

    // Fetch states based on the selected country
    this.states = State.getStatesOfCountry(this.selectedCountry);
  }

  onStateChange() {
    // Reset city dropdown
    this.selectedCity = null;

    // Fetch cities based on the selected state
    this.cities = City.getCitiesOfState(this.selectedState);
  }
}
