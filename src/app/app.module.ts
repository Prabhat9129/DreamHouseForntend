import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from './auth/auth-service.service';
import { PropertyComponent } from './property/property.component';
import { UpdatepasswordComponent } from './auth/updatepassword/updatepassword.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PropertyComponent,
    UpdatepasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
    }),
    NgxSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
