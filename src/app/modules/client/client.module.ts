import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientComponent} from './client.component';
import {RouterModule} from '@angular/router';
import {XsLaravelDataTableModule} from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.module';
import {DialogModule} from 'primeng/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import {KeyFilterModule} from "primeng/keyfilter";
import {CalendarModule} from "primeng/calendar";
import {InvoiceItemComponent} from "./invoice-item/invoice-item.component";
import {InvoiceComponent} from "./invoice/invoice.component";


@NgModule({
  declarations: [ClientComponent, InvoiceComponent, InvoiceItemComponent],
  imports: [
    CommonModule,
    DialogModule,
    RouterModule.forChild([
      {path: '', component: ClientComponent},
      {path: 'invoice/:id', component: InvoiceComponent}
    ]),
    XsLaravelDataTableModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule,
    KeyFilterModule,
    CalendarModule,
    FormsModule,
  ]
})
export class ClientModule {
}
