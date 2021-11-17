import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryComponent} from './category.component';
import {RouterModule} from '@angular/router';
import {XsLaravelDataTableModule} from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.module';
import {DialogModule} from 'primeng/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxValidationErrorsModule} from "@xtream/ngx-validation-errors";
import {XsCommonComponentsModule} from "../../../../projects/xs-common-components/src/lib/xs-common-components.module";


@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    DialogModule,
    RouterModule.forChild([
      {path: '', component: CategoryComponent}
    ]),
    XsLaravelDataTableModule,
    ReactiveFormsModule,
    XsCommonComponentsModule,
    NgxValidationErrorsModule,
  ]
})
export class CategoryModule {
}
