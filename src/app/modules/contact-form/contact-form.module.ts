import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactFormComponent} from './contact-form.component';
import {RouterModule} from '@angular/router';
import {XsLaravelDataTableModule} from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.module';
import {DialogModule} from 'primeng/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {ConfirmationPopoverModule} from "angular-confirmation-popover";


@NgModule({
  declarations: [ContactFormComponent],
    imports: [
        CommonModule,
        DialogModule,
        RouterModule.forChild([
            {path: '', component: ContactFormComponent}
        ]),
        XsLaravelDataTableModule,
        ReactiveFormsModule,
        ConfirmationPopoverModule,
    ]
})
export class ContactFormModule {
}
