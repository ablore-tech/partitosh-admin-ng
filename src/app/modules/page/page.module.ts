import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageComponent} from './page.component';
import {RouterModule} from '@angular/router';
import {XsLaravelDataTableModule} from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.module';
import {DialogModule} from 'primeng/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {XsCommonComponentsModule} from "../../../../projects/xs-common-components/src/lib/xs-common-components.module";
import {NgxValidationErrorsModule} from "@xtream/ngx-validation-errors";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";


@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    DialogModule,
    RouterModule.forChild([
      {path: '', component: PageComponent}
    ]),
    XsLaravelDataTableModule,
    XsCommonComponentsModule,
    ReactiveFormsModule,
    NgxValidationErrorsModule,
    ConfirmationPopoverModule,
  ]
})
export class PageModule {
}
