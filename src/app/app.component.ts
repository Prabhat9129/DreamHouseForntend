import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(
    location: Location,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    router.events.subscribe(() => {
      if (
        location.path() === '/signup' ||
        location.path() === '/login' ||
        location.path() === '/forgotpassword' ||
        location.path() === '/resetpassword'
      ) {
        this.rendHeader = false;
      } else {
        this.rendHeader = true;
      }
    });
  }

  ngOnInit(): void {
    // this.spinner.show();
    // setTimeout(() => {
    // this.spinner.hide();
    // }, 1000);
  }
}
