import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {RouterModule} from '@angular/router';
import {XsLaravelDataTableModule} from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.module';
import {DialogModule} from 'primeng/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {XsCommonComponentsModule} from "../../../../projects/xs-common-components/src/lib/xs-common-components.module";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {SelectButtonModule} from "primeng/selectbutton";
import {NgxValidationErrorsModule} from "@xtream/ngx-validation-errors";
import {KeyFilterModule} from "primeng/keyfilter";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";


@NgModule({
  declarations: [UserComponent],
    imports: [
        CommonModule,
        DialogModule,
        RouterModule.forChild([
            {path: '', component: UserComponent}
        ]),
        XsLaravelDataTableModule,
        XsCommonComponentsModule,
        ReactiveFormsModule,
        InputSwitchModule,
        DropdownModule,
        SelectButtonModule,
        NgxValidationErrorsModule,
        KeyFilterModule,
        ConfirmationPopoverModule,
    ]
})
export class UserModule {
}
