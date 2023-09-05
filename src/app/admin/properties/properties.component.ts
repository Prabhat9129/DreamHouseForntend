import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  properties: any[];
  allow:Boolean=false;

  constructor(private service:PropertyService){}

  ngOnInit(): void {
    this.properties=this.service.arrayPropertySubject.getValue();
    this.service.allProperties()
    this.service.arrayPropertySubject.subscribe((properties) => {
      this.properties = properties;
    });
  }

  onclick(id:any,allow:boolean)
  {
    if(confirm('you wanted to change action! ')){
      this.service.allowproperty(id,allow)
    }
    else
    {

    }
  }

  
}
