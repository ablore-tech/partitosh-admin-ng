import {Component, OnInit, ViewChild} from '@angular/core';
import {ILaravelDataTableConfig} from '../../../../projects/xs-laravel-data-table/src/interfaces/ILaravelDataTableConfig';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {ApiService} from '../../services/api.service';
import {XsLaravelDataTableComponent} from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  @ViewChild('table') table: XsLaravelDataTableComponent;
  public endpoint = 'client/index';
  public displayAddNewModal = false;
  public displayInvoice = false;
  public selectedClient = null;

  public form: FormGroup;
  public invoiceForm: FormGroup;
  public totalTax = 0;
  public totalAmount = 0;
  public config: ILaravelDataTableConfig = {
    fields: [
      {key: 'id', name: 'ID', width: 'min'},
      {key: 'name', name: 'Name'},
      {key: 'created_at', name: 'Created', type: 'dateIST'},
    ]
  };

  constructor(public loader: NgxSpinnerService, public api: ApiService, public router: Router) {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      address: new FormControl(),
      country: new FormControl(),
      state: new FormControl(),
      pincode: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      fax: new FormControl(),
    });
    this.invoiceForm = new FormGroup({
      id: new FormControl(),
      client_id: new FormControl(),
      items: new FormControl([]),
      tax_name: new FormControl(),
      tax_rate: new FormControl(),
      due_date: new FormControl(),
      paid_date: new FormControl(),
      status: new FormControl(),
    });
    this.invoiceForm.valueChanges.subscribe(res => {
      this.totalAmount = 0;
      this.invoiceForm.value.items.forEach(item => {
        this.totalAmount += +item.price * +item.quantity;
      });
      //update tax
      let taxRate = this.invoiceForm.value.tax_rate;
      if (taxRate) {
        this.totalTax = +(this.totalAmount * taxRate / 100).toFixed(2)
      }
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
    this.api.post('client/create', this.form.value)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
        this.table.loadData();
        this.displayAddNewModal = false;
      });
  }

  delete(item) {
    this.loader.show();
    this.api.post('client/destroy', {id: item.id})
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
      });
  }

  formDialogClosed() {
    this.form.reset();
  }

  createInvoice(item: any) {
    this.selectedClient = item;
    this.displayInvoice = true;
    this.invoiceForm.patchValue({
      client_id: item.id
    })
  }

  saveInvoice() {
    this.loader.show();
    this.api.post('invoice/create', this.invoiceForm.value)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
        this.displayInvoice = false;
      });
  }

  viewInvoice(item: any) {
    this.router.navigate(['dashboard/client/invoice/', item.id]).then();
  }
}
