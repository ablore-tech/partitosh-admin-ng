import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkComponent} from './work.component';
import {RouterModule} from '@angular/router';
import {XsLaravelDataTableModule} from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.module';
import {DialogModule} from 'primeng/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {XsCommonComponentsModule} from "../../../../projects/xs-common-components/src/lib/xs-common-components.module";


@NgModule({
  declarations: [WorkComponent],
  imports: [
    CommonModule,
    DialogModule,
    RouterModule.forChild([
      {path: '', component: WorkComponent}
    ]),
    XsLaravelDataTableModule,
    ReactiveFormsModule,
    XsCommonComponentsModule
  ]
})
export class WorkModule {
}
