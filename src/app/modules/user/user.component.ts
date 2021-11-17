import {Component, OnInit, ViewChild} from '@angular/core';
import {ILaravelDataTableConfig} from '../../../../projects/xs-laravel-data-table/src/interfaces/ILaravelDataTableConfig';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {ApiService} from '../../services/api.service';
import {XsLaravelDataTableComponent} from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {BaseComponent} from "../../base-component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseComponent implements OnInit {
  @ViewChild('table') table: XsLaravelDataTableComponent;
  public endpoint = 'user/index';
  public displayAddNewModal = false;
  public form: FormGroup;
  public config: ILaravelDataTableConfig = {
    fields: [
      {key: 'id', name: 'ID', width: 'min'},
      {key: 'email', name: 'Email',},
      {key: 'name', name: 'Name',},
      {key: 'status', name: 'Status',},
      {key: 'created_at', name: 'Created', type: 'dateIST', width: 'min'},
    ]
  };
  public roles = [
    {label: 'Admin', value: 'admin'},
    {label: 'Hotel Manager', value: 'hotel_manager'},
    {label: 'User', value: 'user'},
  ]

  constructor(public loader: NgxSpinnerService, public api: ApiService) {
    super();
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.min(10)]),
      password: new FormControl(),
      photo: new FormControl(),
      status: new FormControl(false, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  editUser(item: any) {

    this.form.patchValue(item);

    this.displayAddNewModal = true;
  }

  submitForm() {
    this.runFormValidation(this.form)
    if (this.form.invalid) return;

    this.loader.show();
    this.api.post('user/create', this.form.value)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
        this.table.loadData();
        this.displayAddNewModal = false;
      });
  }

  delete(item) {
    this.loader.show();
    this.api.post('user/destroy', {id: item.id})
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
        this.table.loadData();
      });
  }

  formDialogClosed() {
    this.form.reset();
  }

  addNew() {
    this.form.reset({role: 'admin', status: false});
    this.displayAddNewModal = true;
  }
}
