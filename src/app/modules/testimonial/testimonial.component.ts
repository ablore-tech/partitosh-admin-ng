import {Component, OnInit, ViewChild} from '@angular/core';
import {ILaravelDataTableConfig} from '../../../../projects/xs-laravel-data-table/src/interfaces/ILaravelDataTableConfig';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {ApiService} from '../../services/api.service';
import {XsLaravelDataTableComponent} from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {
  @ViewChild('table') table: XsLaravelDataTableComponent;
  public endpoint = 'testimonial/index';
  public displayAddNewModal = false;
  public form: FormGroup;

  public config: ILaravelDataTableConfig = {
    fields: [
      {key: 'id', name: 'ID', width: 'min'},
      {key: 'name', name: 'Name', width: 'min'},
      {key: 'designation', name: 'Designation', width: 'min'},
      {key: 'rating', name: 'Rating', width: 'min'},
      {key: 'image', name: 'Photo', width: 'min'},
      {key: 'created_at', name: 'Created', type: 'dateIST'},
    ]
  };

  constructor(public loader: NgxSpinnerService, public api: ApiService) {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required]),
      designation: new FormControl(null, [Validators.required]),
      rating: new FormControl(null, [Validators.required]),
      comment: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required])
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
    this.api.post('testimonial/create', this.form.value)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
        this.table.loadData();
        this.displayAddNewModal = false;
      });
  }

  delete(item) {
    this.loader.show();
    this.api.post('testimonial/destroy', {id: item.id})
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
        this.table.loadData();
      });
  }

  formDialogClosed() {
    this.form.reset();
  }
}
