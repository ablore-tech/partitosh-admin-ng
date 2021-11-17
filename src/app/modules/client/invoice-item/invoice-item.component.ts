import {Component, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InvoiceItemComponent,
      multi: true
    }
  ]
})
export class InvoiceItemComponent implements OnInit, ControlValueAccessor {

  public onChange: (value: any) => void;
  public items: InvoiceItem[] = [];
  public emptyItem: InvoiceItem = {
    id: uuidv4(),
    name: '',
    price: 0,
    quantity: 1,
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  writeValue(obj: any): void {
    this.items = obj;
  }

  addEmpty() {
    this.items = [...this.items, {
      id: uuidv4(),
      name: '',
      price: 0,
      quantity: 1,
    }]
  }

  updated() {
    this.onChange(this.items)
  }

  deleteItem(idx: number) {
    this.items.splice(idx, 1);
    this.items = [...this.items];
  }
}
