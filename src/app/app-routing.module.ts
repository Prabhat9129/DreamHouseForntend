import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PropertyComponent } from './property/property.component';
import { UpdatepasswordComponent } from './auth/updatepassword/updatepassword.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'signup', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'property', component: PropertyComponent },
  { path: 'PasswordUpadte', component: UpdatepasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
