import { Component } from '@angular/core';

@Component({
  selector: 'app-login-model',
  templateUrl: './login-model.component.html',
  styleUrls: ['./login-model.component.css']
})
export class LoginModelComponent {

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
    console.log('hello')
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
}
