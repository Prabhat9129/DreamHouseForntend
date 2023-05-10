import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Import routing module
import { AppRoutingModule } from '../admin-module/app-routing.module';

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';
import { Title } from '@angular/platform-browser';
import { AdminHeaderComponent } from './default/admin-header/admin-header.component';
import { DefaultComponent } from './default/default.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [AdminHeaderComponent, DefaultComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    HeaderModule,
    SidebarModule,
    NavModule,
    ReactiveFormsModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FooterModule,
    FormModule,
    GridModule,
    ListGroupModule,
    AvatarModule,
    ProgressModule,
    SharedModule,
    TabsModule,
    PerfectScrollbarModule,
    UtilitiesModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },

    Title,
  ],
  exports: [DefaultComponent],
})
export class AdminModuleModule {}
