import {Component, OnInit, ViewChild} from '@angular/core';
import {ILaravelDataTableConfig} from '../../../../projects/xs-laravel-data-table/src/interfaces/ILaravelDataTableConfig';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {ApiService} from '../../services/api.service';
import {XsLaravelDataTableComponent} from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-why-choose',
  templateUrl: './why-choose.component.html',
  styleUrls: ['./why-choose.component.scss']
})
export class WhyChooseComponent implements OnInit {
  @ViewChild('table') table: XsLaravelDataTableComponent;
  public endpoint = 'why-choose/index';
  public displayAddNewModal = false;
  public form: FormGroup;

  public config: ILaravelDataTableConfig = {
    fields: [
      {key: 'id', name: 'ID', width: 'min'},
      {key: 'title', name: 'Title'},
      {key: 'created_at', name: 'Created', type: 'dateIST'},
    ]
  };

  constructor(public loader: NgxSpinnerService, public api: ApiService) {
    this.form = new FormGroup({
      id: new FormControl(),
      title: new FormControl(),
      image: new FormControl(),
      description: new FormControl(),
      p1: new FormControl(),
      p2: new FormControl(),
      p3: new FormControl()
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
    this.api.post('why-choose/create', this.form.value)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
        this.table.loadData();
        this.displayAddNewModal = false;
      });
  }

  delete(item) {
    this.loader.show();
    this.api.post('why-choose/destroy', {id: item.id})
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
      });
  }

  formDialogClosed() {
    this.form.reset();
  }
}
