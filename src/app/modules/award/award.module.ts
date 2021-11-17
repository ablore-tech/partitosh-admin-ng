import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AwardComponent} from './award.component';
import {RouterModule} from '@angular/router';
import {XsLaravelDataTableModule} from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.module';
import {DialogModule} from 'primeng/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {XsCommonComponentsModule} from "../../../../projects/xs-common-components/src/lib/xs-common-components.module";


@NgModule({
  declarations: [AwardComponent],
  imports: [
    CommonModule,
    DialogModule,
    RouterModule.forChild([
      {path: '', component: AwardComponent}
    ]),
    XsLaravelDataTableModule,
    ReactiveFormsModule,
    XsCommonComponentsModule
  ]
})
export class AwardModule {
}
