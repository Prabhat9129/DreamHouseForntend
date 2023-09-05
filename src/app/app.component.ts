import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServiceService } from './auth/auth-service.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Dream_House';
  isLoading = false;
  loggedinPage = false;
  route: string = '';
  rendHeader = true;
  
  hideHeader: boolean;

  constructor(private service:AuthServiceService,
    private activatedRoute: ActivatedRoute,
    location: Location,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideHeader = this.shouldHideHeader(this.activatedRoute);
      }
    });

    
    // router.events.pipe(first()).subscribe(() => {
    //   console.log(location.path())
    //   if (
    //     location.path() === '/signup' ||
    //     location.path() === '/login' ||
    //     location.path() === '/forgotpassword' ||
    //     location.path() === '/resetpassword'||
    //     location.path() === '/admin/dashboard'
    //   ) {
    //     this.rendHeader = false;
    //   } else {
    //     this.rendHeader = true;
    //   }
    // });
  }

  private shouldHideHeader(route: ActivatedRoute): boolean {
    if (route.firstChild) {
      return this.shouldHideHeader(route.firstChild);
    }

    return route.snapshot.data['hideHeader'] || false;
  }

  ngOnInit(): void {}
    
}
