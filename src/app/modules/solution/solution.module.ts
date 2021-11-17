import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SolutionComponent} from './solution.component';
import {RouterModule} from '@angular/router';
import {XsLaravelDataTableModule} from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.module';
import {DialogModule} from 'primeng/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {StyleClassModule} from "primeng/styleclass";
import {XsCommonComponentsModule} from "../../../../projects/xs-common-components/src/lib/xs-common-components.module";
import {ToggleButtonModule} from "primeng/togglebutton";
import {InputSwitchModule} from "primeng/inputswitch";


@NgModule({
  declarations: [SolutionComponent],
  imports: [
    CommonModule,
    DialogModule,
    RouterModule.forChild([
      {path: '', component: SolutionComponent}
    ]),
    XsLaravelDataTableModule,
    ReactiveFormsModule,
    StyleClassModule,
    XsCommonComponentsModule,
    ToggleButtonModule,
    InputSwitchModule
  ]
})
export class SolutionModule {
}
