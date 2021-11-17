import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestimonialComponent} from './testimonial.component';
import {RouterModule} from '@angular/router';
import {XsLaravelDataTableModule} from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.module';
import {DialogModule} from 'primeng/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxValidationErrorsModule} from "@xtream/ngx-validation-errors";
import {XsCommonComponentsModule} from "../../../../projects/xs-common-components/src/lib/xs-common-components.module";
import {StyleClassModule} from "primeng/styleclass";
import {KeyFilterModule} from "primeng/keyfilter";


@NgModule({
  declarations: [TestimonialComponent],
  imports: [
    CommonModule,
    DialogModule,
    RouterModule.forChild([
      {path: '', component: TestimonialComponent}
    ]),
    XsLaravelDataTableModule,
    ReactiveFormsModule,
    NgxValidationErrorsModule,
    XsCommonComponentsModule,
    StyleClassModule,
    KeyFilterModule
  ]
})
export class TestimonialModule {
}
