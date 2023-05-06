import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Import routing module
import { AppRoutingModule } from '../admin-module/app-routing.module';

// Import app component
import { AppComponent } from '../admin-module/app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

import { IconModule, IconSetService } from '@coreui/icons-angular';
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

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];
@NgModule({
  declarations: [AppComponent, DefaultLayoutComponent, ...APP_CONTAINERS],
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
    IconSetService,
    Title,
  ],
  exports: [AppComponent],
})
export class AdminModuleModule {}
