import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/model/property';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-properties-details',
  templateUrl: './properties-details.component.html',
  styleUrls: ['./properties-details.component.css']
})
export class PropertiesDetailsComponent implements OnInit {
  properties: Property;
  

  constructor(private service:PropertyService,
    private route:ActivatedRoute ){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(id)

    this.service.property(id).subscribe( property => {
      console.log(property);
      this.properties = property.property;
      console.log(this.properties);
    },
    error => {
      console.error('Failed to fetch properties:', error);
    })
  }

  onSubmit(forms:NgForm){
    console.log(forms.form.value);
    this.service.booking(forms.form.value.property_id,forms.form.value.message);

  }

}
