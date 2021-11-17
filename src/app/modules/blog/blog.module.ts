import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogComponent} from './blog.component';
import {RouterModule} from '@angular/router';
import {XsLaravelDataTableModule} from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.module';
import {DialogModule} from 'primeng/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {XsCommonComponentsModule} from "../../../../projects/xs-common-components/src/lib/xs-common-components.module";
import {SelectButtonModule} from "primeng/selectbutton";
import {NgxValidationErrorsModule} from "@xtream/ngx-validation-errors";
import {ChipsModule} from "primeng/chips";
import {ListboxModule} from "primeng/listbox";
import {DropdownModule} from "primeng/dropdown";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";


@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    DialogModule,
    RouterModule.forChild([
      {path: '', component: BlogComponent}
    ]),
    XsLaravelDataTableModule,
    XsCommonComponentsModule,
    ReactiveFormsModule,
    SelectButtonModule,
    NgxValidationErrorsModule,
    ChipsModule,
    ListboxModule,
    DropdownModule,
    ConfirmationPopoverModule,
  ]
})
export class BlogModule {
}
