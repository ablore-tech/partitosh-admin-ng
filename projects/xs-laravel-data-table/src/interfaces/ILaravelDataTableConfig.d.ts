import {ILaravelDataTableField} from './ILaravelDataTableField';
import {IAction} from './IAction';
import {TemplateRef} from '@angular/core';

export interface ILaravelDataTableConfig {
  fields: ILaravelDataTableField[];
  quickLinks?: boolean;
  groupActions?: boolean;
  actions?: TemplateRef<any>;
  sortFn?: (item) => {};
}
