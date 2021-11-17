import {TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';

export interface ILaravelDataTableField {
  name: string;
  key: string | TemplateRef<any>;
  filter?: string | boolean;
  sortable?: boolean;
  focus?: boolean;
  filterKey?: string;
  width?: string;
  type?: 'text' | 'image' | 'date' | 'sort' | 'select' | 'currency' | any;
  render?: (val) => {};
  src?: string;
  dateFormat?: string;
  template?: TemplateRef<any>;
  selectOptions?: {
    label: string,
    value: string
    options: any[]
  } | Observable<any>;
}
