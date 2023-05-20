import { Component, OnInit } from '@angular/core';
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
  logout: boolean = false;
  seller: boolean = false;
  token: any = '';
  name: string;
  email: string;
  url: string = '../assets/Clientassets/images/testimonials/p1.jpeg';
  err: string;
  userdata: User;
  constructor(
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private service: AuthServiceService
  ) {}
  ngOnInit(): void {
    // this.service.getdata().subscribe((userdata: User) => {
    //   this.userdata = userdata;

    //   console.log(userdata.name);
    //   this.name = userdata.name;
    //   this.email = userdata.email;
    //   // this.url = userdata.profileImg;
    //   console.log(this.userdata);
    //   console.log(this.name);
    // });
    // console.log(this.name);

    this.token = localStorage.getItem('token');
    if (this.token) {
      this.logout = true;
    }
    this.service.getUser();

    let authObs: Observable<any>;
    authObs = this.service.getUser();
    authObs.subscribe(
      (res) => {
        // console.log(res);
        if (res) {
          this.name = res.userdata.name;
          this.email = res.userdata.email;
          this.url = res.userdata.profileImg;
          if (res.userdata.role === 'seller') {
            this.seller = true;
          }
        }
      },
      (err) => {
        this.err = err;
      }
    );
  }

  onLogout() {
    if (this.logout) {
      localStorage.removeItem('token');
      this.email = '';
      this.name = '';
      this.url = '../assets/Clientassets/images/testimonials/p1.jpeg';
      this.toaster.success('success', 'user Logout successfully');
      this.logout = false;
      this.router.navigate(['home']);
    }
  }
}
