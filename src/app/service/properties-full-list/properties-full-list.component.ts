import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-properties-full-list',
  templateUrl: './properties-full-list.component.html',
  styleUrls: ['./properties-full-list.component.css']
})
export class PropertiesFullListComponent implements OnInit  {
  properties: any[];

  constructor(private service:PropertyService){}

  ngOnInit(): void {
    this.properties=this.service.arrayPropertySubject.getValue().filter(property => property.allowance === true);
    this.service.allProperties()
    this.service.arrayPropertySubject.subscribe((properties) => {
      this.properties = properties.filter(property => property.allowance === true);
    });
  }
}
