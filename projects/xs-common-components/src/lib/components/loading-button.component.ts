import {ChangeDetectionStrategy, Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-button',
  template: `
    <button [type]="type" [disabled]="disabled" class="p-button px-5" [ngClass]="{'p-disabled':disabled}">{{label}}
      <i *ngIf="loading===false && icon" class="ms-2" [ngClass]="icon"></i>
      <span *ngIf="loading" class="ms-2 spinner-border spinner-border-sm" role="status"></span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: []
})
export class LoadingButtonComponent {

  @Input() loading = false;
  @Input() type = "submit";
  @Input() disabled = false;
  @Input() label: string = "";
  @Input() icon: string = "pi pi-angle-right";

  @HostListener('click', ['$event'])
  onClick(e) {
  }


}
