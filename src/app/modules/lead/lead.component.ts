import {Component, OnInit, ViewChild} from '@angular/core';
import {ILaravelDataTableConfig} from '../../../../projects/xs-laravel-data-table/src/interfaces/ILaravelDataTableConfig';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {ApiService} from '../../services/api.service';
import {XsLaravelDataTableComponent} from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss']
})
export class LeadComponent implements OnInit {
  @ViewChild('table') table: XsLaravelDataTableComponent;
  public endpoint = 'lead/index';
  public displayAddNewModal = false;
  public form: FormGroup;

  public config: ILaravelDataTableConfig = {
    fields: [
      {key: 'id', name: 'ID', width: 'min'},
      {key: 'first_name', name: 'First Name'},
      {key: 'last_name', name: 'Last Name'},
      {key: 'email', name: 'Email'},
      {key: 'source', name: 'Source'},
      {key: 'created_at', name: 'Created', type: 'dateIST'},
    ]
  };

  constructor(public loader: NgxSpinnerService, public api: ApiService) {
    this.form = new FormGroup({
      id: new FormControl(),

    });
  }

  ngOnInit(): void {
  }

  editUser(item: any) {
    this.form.patchValue(item);
    this.displayAddNewModal = true;
  }

  submitForm() {
    this.loader.show();
    this.api.post('lead/create', this.form.value)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
        this.table.loadData();
        this.displayAddNewModal = false;
      });
  }

  delete(item) {
    this.loader.show();
    this.api.post('lead/destroy', {id: item.id})
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
      });
  }

  formDialogClosed() {
    this.form.reset();
  }
}
