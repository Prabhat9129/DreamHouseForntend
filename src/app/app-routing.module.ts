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
import { CanDeactivateGaurd } from './service/updateprofile/can-deactivate-gaurd.service';
import { AddpropertyComponent } from './service/addproperty/addproperty.component';
import { ContactComponent } from './service/contact/contact.component';
import { AboutusComponent } from './service/aboutus/aboutus.component';
import { PropertiesFullListComponent } from './service/properties-full-list/properties-full-list.component';
import { PropertiesDetailsComponent } from './service/properties-details/properties-details.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddpropertytypeComponent } from './admin/addpropertytype/addpropertytype.component';
import { ViewpropertytypeComponent } from './admin/viewpropertytype/viewpropertytype.component';
import { UpdatepropertytypeComponent } from './admin/updatepropertytype/updatepropertytype.component';
import { PropertiesComponent } from './admin/properties/properties.component';
import { UsersComponent } from './admin/users/users.component';
import { BookingComponent } from './admin/booking/booking.component';

const routes: Routes = [
  { path: '', title: 'DreamHouse', component: HomeComponent },
  { path: 'signup', title: 'Signup', component: RegisterComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  {
    path: 'forgotpassword',
    title: 'ForgotPassword',
    component: ForgotpasswordComponent,
  },
  {
    path: 'resetpassword/:token',
    title: 'ResetPassword',
    component: ResetpasswordComponent,
  },
  { path: 'home', title: 'Home', component: HomeComponent },
  {
    path: 'PasswordUpadte',
    title: 'UpdatePassword',
    canActivate: [AuthGuard],
    component: UpdatepasswordComponent,
  },
  {
    path: 'updateprofile',
    title: 'UpdateProfile',
    canActivate: [AuthGuard],
    component: UpdateprofileComponent,
  },
  {
    path: 'addproperty',
    title: 'AddProperty',
    canActivate: [AuthGuard],
    component: AddpropertyComponent,
  },
  {
    path: 'contact',
    title: 'Contact Page',
    component: ContactComponent,
  },
  {
    path: 'propertylist',
    title: 'Property-Full-List',
    component: PropertiesFullListComponent,
  },
  {
    path: 'propertydetail/:id',
    title: 'Property-Details',
    canActivate: [AuthGuard],
    component: PropertiesDetailsComponent,
  },
  {
    path: 'about',
    title: 'Aboutus Page',
    component: AboutusComponent,
  },
  // ,canDeactivate:[CanDeactivateGaurd]
  { path: 'property', title: 'Properties', component: PropertyComponent },
  {path: 'admin',
    title:'Admin Home Page',
    component:AdminComponent,
    children:[
      {path:'',redirectTo:'dashboard',pathMatch:'full'},
      {path:'dashboard',title:'Dashboard',component:DashboardComponent , data: { hideHeader: true }},
      {path:'addpropertytype',title:'Property Type',component:AddpropertytypeComponent , data: { hideHeader: true }},
      {path:'viewpropertytype',title:'View Property Type',component:ViewpropertytypeComponent , data: { hideHeader: true }},
      {path:'updatepropertytype/:id/:name',title:'update Property Type',component:UpdatepropertytypeComponent , data: { hideHeader: true }},
      {path:'viewproperties',title:'All Properties',component:PropertiesComponent , data: { hideHeader: true }},
      {path:'Allusers',title:'Users',component:UsersComponent , data: { hideHeader: true }},
      {path:'viewbooking',title:'Booking',component:BookingComponent , data: { hideHeader: true }},
    ]
  },
  // {path:'admin',loadChildren:()=>import('./admin-module/admin-module.module').then(m=>m.AdminModuleModule)},
  { path: 'not-found', title: 'NotFound', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
