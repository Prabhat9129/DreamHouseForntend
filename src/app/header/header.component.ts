import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  AuthResponseData,
  AuthServiceService,
} from '../auth/auth-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  logout: boolean = false;
  token: any = '';
  name: string;
  email: string;
  url: string = '../assets/Clientassets/images/testimonials/p1.jpeg';
  err: string;

  constructor(
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private service: AuthServiceService
  ) {}
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.logout = true;
    }
    // this.service.getUser();

    let authObs: Observable<any>;
    authObs = this.service.getUser();
    authObs.subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.name = res.name;
          this.email = res.email;
          this.url = res.profileImg;
        }
      },
      (err) => {
        this.err = err;
      }
    );
  }

  onLogout() {
    console.log('hello');
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
