import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Dream_House';
  loggedinPage = false;
  route: string = '';
  rendHeader = true;

  constructor(location: Location, private router: Router) {
    router.events.subscribe(() => {
      if (location.path() === '/signup' || location.path() === '/login') {
        this.rendHeader = false;
      } else {
        this.rendHeader = true;
      }
    });
  }

  ngOnInit(): void {}
}
