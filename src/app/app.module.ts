import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { Country, State, City } from 'country-state-city';
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
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { UpdateprofileComponent } from './service/updateprofile/updateprofile.component';
import { FooterComponent } from './footer/footer.component';
import { AdminModuleModule } from './admin-module/admin-module.module';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth/auth-guard';
import { LoginModelComponent } from './auth/login-model/login-model.component';
import { CanDeactivateGaurd } from './service/updateprofile/can-deactivate-gaurd.service';
import { AddpropertyComponent } from './service/addproperty/addproperty.component';
import { ContactComponent } from './service/contact/contact.component';
import { AboutusComponent } from './service/aboutus/aboutus.component';
import { PropertiesFullListComponent } from './service/properties-full-list/properties-full-list.component';
import { PropertiesDetailsComponent } from './service/properties-details/properties-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PropertyComponent,
    UpdatepasswordComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    UpdateprofileComponent,
    FooterComponent,
    NotFoundComponent,
    LoginModelComponent,
    AddpropertyComponent,
    ContactComponent,
    AboutusComponent,
    PropertiesFullListComponent,
    PropertiesDetailsComponent,
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
    AdminModuleModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    AuthServiceService,
    AuthGuard,
    CanDeactivateGaurd,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
