import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PropertyComponent } from './property/property.component';
import { UpdatepasswordComponent } from './auth/updatepassword/updatepassword.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { UpdateprofileComponent } from './service/updateprofile/updateprofile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth/auth-guard';
import { LoginModelComponent } from './auth/login-model/login-model.component';
import { CanDeactivateGaurd } from './service/updateprofile/can-deactivate-gaurd.service';

const routes: Routes = [
  { path: '',title:'DreamHouse', component: HomeComponent },
  { path: 'signup',title:'Signup', component: RegisterComponent },
  { path: 'login',title:'Login', component: LoginComponent},
  { path: 'forgotpassword',title:'ForgotPassword', component: ForgotpasswordComponent },
  { path: 'resetpassword/:token',title:'ResetPassword', component: ResetpasswordComponent },
  { path: 'home',title:'Home', component: HomeComponent },
  {path:'login-model',title:'LoginModel',component:LoginModelComponent},
  { path: 'PasswordUpadte',title:'UpdatePassword',canActivate:[AuthGuard], component: UpdatepasswordComponent },
  { path: 'updateprofile',title:'UpdateProfile',canActivate:[AuthGuard], component: UpdateprofileComponent,canDeactivate:[CanDeactivateGaurd] },
  { path: 'property',title:'Properties', component: PropertyComponent },
  { path:'not-found',title: 'NotFound', component:NotFoundComponent},
	{ path:'**', redirectTo:'/not-found',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
