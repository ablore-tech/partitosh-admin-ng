import {Component, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-media-column',
  templateUrl: './media-column.component.html',
  styleUrls: ['./media-column.component.scss'],
  providers: [
    {
      useExisting: MediaColumnComponent,
      provide: NG_VALUE_ACCESSOR,
      multi: true
    }
  ]
})
export class MediaColumnComponent implements ControlValueAccessor {

  public item = {
    title: '',
    description: '',
    button_text: '',
    button_link: '',
    banner: ''
  }
  public _change = (_) => {
  }

  registerOnChange(fn: any): void {
    this._change = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    if (obj && obj.title)
      this.item = obj;
  }

  update() {
    this._change(this.item);
  }
}
