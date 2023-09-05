import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
propertycount:number;
sellercount:number;
buyercount:number;

  constructor(private service:AdminService,private proservice:PropertyService){}

  ngOnInit(): void 
  {
    this.service.findusers().subscribe( users => {
      this.buyercount = users.userdata.filter((us: { role: string; }) => us.role === 'buyer').length;
      this.sellercount = users.userdata.filter((us: { role: string; }) => us.role === 'seller').length;
    },
    error => {
      console.error('Failed to fetch users:', error);
    })

    this.proservice.allProperties()
    this.propertycount=this.proservice.arrayPropertySubject.getValue().length;

  }

}
