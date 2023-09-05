import { Component,OnInit,ViewEncapsulation } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminComponent implements OnInit {

  constructor(private service:AuthServiceService,
    private toaster:ToastrService,
    private router:Router){}

    ngOnInit(): void {}

   onLogout() {
    localStorage.removeItem('token');
    this.toaster.success('success', 'user Logout successfully');
    this.service.isLogged.next(false);
    this.service.role.next("");
    this.router.navigate(['home']);
    }

}
