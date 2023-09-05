import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:any[];
 constructor(private service:AdminService){}

  ngOnInit(): void {

    this.service.findusers().subscribe( users => {
      console.log(users);
      this.users = users.userdata;
      console.log(this.users);
    },
    error => {
      console.error('Failed to fetch users:', error);
    })
  }

}
