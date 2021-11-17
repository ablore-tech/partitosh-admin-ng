import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import {XsLaravelDataTableComponent} from "../../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.component";
import {ApiService} from "../../../services/api.service";
import {ILaravelDataTableConfig} from "../../../../../projects/xs-laravel-data-table/src/interfaces/ILaravelDataTableConfig";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  @ViewChild('table') table: XsLaravelDataTableComponent;
  public endpoint = 'invoice/index';
  public displayAddNewModal = false;
  public displayInvoice = false;

  public form: FormGroup;
  public invoiceForm: FormGroup;
  public clientId;
  public config: ILaravelDataTableConfig = {
    fields: [
      {key: 'id', name: 'ID', width: 'min'},
      {key: 'sub_total', name: 'Sub Total', width: 'min', type: 'currency'},
      {key: 'tax', name: 'Tax', width: 'min'},
      {key: 'total', name: 'Total', width: 'min'},
      {key: 'created_at', name: 'Created', type: 'dateIST'},
    ]
  };
  public totalAmount = 0;
  public totalTax = 0;
  selectedClient: any;

  saveInvoice() {
    this.loader.show();
    this.api.post('invoice/create', this.invoiceForm.value)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
        this.displayInvoice = false;
        this.table.loadData();
      });
  }

  constructor(public loader: NgxSpinnerService, public api: ApiService, public activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.clientId = params['id'];
      this.endpoint = 'invoice/index?client_id=' + this.clientId;
    });
    this.form = new FormGroup({
      id: new FormControl(),
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
    if (item.due_date) item.due_date = new Date(item.due_date);
    this.invoiceForm.patchValue(item);
    this.displayInvoice = true;
  }


  delete(item) {
    this.loader.show();
    this.api.post('invoice/destroy', {id: item.id})
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
        this.table.loadData();
      });
  }

  formDialogClosed() {
    this.form.reset();
  }

  addNew() {
    this.invoiceForm.patchValue({client_id: this.clientId});
    this.displayInvoice = true;
  }

  download(item: any) {
    this.loader.show();
    this.api.post('invoice/download', {id: item.id})
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
        window.open(res.url);
      });
  }

}
