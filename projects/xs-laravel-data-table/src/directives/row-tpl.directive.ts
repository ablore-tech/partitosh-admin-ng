import {Directive, TemplateRef} from '@angular/core';

@Directive({
   selector: '[lt-row-template]'
})
export class RowTplDirective {

   constructor(public tpl: TemplateRef<any>) { }

}
