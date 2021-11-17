import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard.component";
import {XsCommonComponentsModule} from "../../../projects/xs-common-components/src/lib/xs-common-components.module";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    XsCommonComponentsModule
  ]
})
export class DashboardModule {
}
