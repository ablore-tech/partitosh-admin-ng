import {NgModule} from '@angular/core';
import {XsLaravelDataTableComponent} from './xs-laravel-data-table.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RowTplDirective} from '../directives/row-tpl.directive';
import {LtCellTemplateDirective} from '../directives/lt-cell-template.directive';
import {PaginatorModule} from 'primeng/paginator';
import {ButtonModule} from 'primeng/button';
import {SvgLoaderComponent} from './svg-loader/svg-loader.component';
import {NoRecordsComponent} from './no-records/no-records.component';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [
    XsLaravelDataTableComponent,
    RowTplDirective,
    LtCellTemplateDirective,
    SvgLoaderComponent,
    NoRecordsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    PaginatorModule,
    ButtonModule,
    CalendarModule,
  ],
  exports: [
    XsLaravelDataTableComponent,
    RowTplDirective,
    LtCellTemplateDirective
  ]

})
export class XsLaravelDataTableModule {
}
