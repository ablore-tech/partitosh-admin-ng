import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
   selector: '[lt-cell-template]'
})
export class LtCellTemplateDirective {
   @Input() public field;

   constructor(public tpl: TemplateRef<any>) { }

}
