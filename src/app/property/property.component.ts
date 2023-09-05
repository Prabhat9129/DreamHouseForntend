import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  properties: any[];
constructor(private service:PropertyService){}

ngOnInit(): void {
  this.properties=this.service.arrayPropertySubject.getValue().filter(property => property.allowance === true);
  this.service.allProperties();
    this.service.arrayPropertySubject.subscribe((properties) => {
      this.properties = properties.filter(property => property.allowance === true);
    });
}

}
