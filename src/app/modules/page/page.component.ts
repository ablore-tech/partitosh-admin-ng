import {Component, OnInit, ViewChild} from '@angular/core';
import {ILaravelDataTableConfig} from '../../../../projects/xs-laravel-data-table/src/interfaces/ILaravelDataTableConfig';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {ApiService} from '../../services/api.service';
import {XsLaravelDataTableComponent} from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {environment} from "../../../environments/environment";
import {LocalStorage} from "ngx-webstorage";
import {BaseComponent} from "../../base-component";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent extends BaseComponent implements OnInit {
  @ViewChild('table') table: XsLaravelDataTableComponent;
  public endpoint = 'page/index';
  public displayAddNewModal;
  public form: FormGroup;

  public config: ILaravelDataTableConfig = {
    fields: [
      {key: 'id', name: 'ID', width: 'min'},
      {key: 'title', name: 'Title'},
      {key: 'slug', name: 'Url Slug'},
      {key: 'created_at', name: 'Created', type: 'dateIST'},
    ]
  };

  constructor(public loader: NgxSpinnerService, public api: ApiService) {
    super();
    this.form = new FormGroup({
      id: new FormControl(),
      title: new FormControl(null, [Validators.required]),
      slug: new FormControl(),
      content: new FormControl(),
      seo: new FormControl(),

    });
  }

  ngOnInit(): void {
  }

  editUser(item: any) {
    this.form.patchValue(item);
    this.displayAddNewModal = true;
  }

  submitForm() {
    if (this.form.invalid) return this.runFormValidation(this.form);
    this.loader.show();
    this.api.post('page/create', this.form.value)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
        this.table.loadData();
        this.displayAddNewModal = false;
      });
  }

  delete(item) {
    this.loader.show();
    this.api.post('page/destroy', {id: item.id})
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
        this.table.loadData();
      });
  }

  formDialogClosed() {
    this.form.reset();
  }
}
