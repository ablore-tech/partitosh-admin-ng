import {Component, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-home-slides',
  templateUrl: './home-slides.component.html',
  styleUrls: ['./home-slides.component.scss'],
  providers: [
    {
      useExisting: HomeSlidesComponent,
      provide: NG_VALUE_ACCESSOR,
      multi: true
    }
  ]
})
export class HomeSlidesComponent implements ControlValueAccessor {
  public slides = [];
  public empty = {
    title: '',
    description: '',
    button_text: '',
    button_link: '',
    banner: ''
  }

  public _change = (_) => {
  }

  userByName(index, item) {
    return index;
  }

  addNew() {
    this.slides = [...this.slides, Object.assign({}, this.empty)];
  }


  registerOnChange(fn: any): void {
    this._change = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    if (Array.isArray(obj)) this.slides = obj;
  }

  update() {
    this._change(this.slides)
  }
}
