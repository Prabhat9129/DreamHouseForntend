import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  logout: boolean = false;
  token: any = '';

  constructor(
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.logout = true;
    }
    console.log(this.logout, this.token);
  }

  onLogout() {
    if (this.logout) {
      localStorage.removeItem('token');
      this.toaster.success('success', 'user Logout successfully');
      this.logout = false;
      this.router.navigate(['home']);
    } else {
      this.toaster.info('success', 'user alredy logout successfully');
    }
  }
}
