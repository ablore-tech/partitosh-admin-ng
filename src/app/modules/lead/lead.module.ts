import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LeadComponent} from './lead.component';
import {RouterModule} from '@angular/router';
import {XsLaravelDataTableModule} from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.module';
import {DialogModule} from 'primeng/dialog';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [LeadComponent],
  imports: [
    CommonModule,
    DialogModule,
    RouterModule.forChild([
      {path: '', component: LeadComponent}
    ]),
    XsLaravelDataTableModule,
    ReactiveFormsModule,
  ]
})
export class LeadModule {
}
