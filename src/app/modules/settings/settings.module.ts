import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './settings/settings.component';
import {RouterModule} from "@angular/router";
import {TabMenuModule} from "primeng/tabmenu";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TabViewModule} from "primeng/tabview";
import {XsCommonComponentsModule} from "../../../../projects/xs-common-components/src/lib/xs-common-components.module";
import {MediaColumnComponent} from './settings/media-column/media-column.component';
import { HomeSlidesComponent } from './settings/home-slides/home-slides.component';


@NgModule({
  declarations: [SettingsComponent, MediaColumnComponent, HomeSlidesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: SettingsComponent}]),
    TabMenuModule,
    ReactiveFormsModule,
    XsCommonComponentsModule,
    TabViewModule,
    FormsModule
  ]
})
export class SettingsModule {
}
