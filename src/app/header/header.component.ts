import { Component, OnInit , ChangeDetectorRef, HostListener  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  AuthResponseData,
  AuthServiceService,
} from '../auth/auth-service.service';
import { Observable } from 'rxjs';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogged: boolean;
  token: any = '';
  seller:boolean=false;
  role:string;
  name:string;
  email:string;
  url:string | undefined ;
  userData: User;

  constructor(
    private toaster: ToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private service: AuthServiceService
  ) {}
  
  ngOnInit(): void {
    this.service.isLogged.subscribe((res) => {
      this.isLogged = res;
    });

    this.service.role.subscribe((res)=>{
      console.log(res);
      this.role=res;
      if(res==="seller"){
        this.seller=true;
      }

    });

    this.service.user.subscribe((userdata: User) => {
      console.log(userdata);
      console.log(userdata.role);
      this.userData = userdata;
      this.name=this.userData.name;
      this.url=this.userData.profileImg;
      if(userdata.role==="seller")
      {
        this.seller=true
      }
      console.log(this.userData)
    }); 
  }

  onLogout() {
      localStorage.removeItem('token');
      this.email = '';
      this.name = '';
      this.url = '../assets/Clientassets/images/testimonials/p1.jpeg';
      this.toaster.success('success', 'user Logout successfully');
      this.service.isLogged.next(false);
      this.service.role.next("");
      this.router.navigate(['home']);
  }
}
