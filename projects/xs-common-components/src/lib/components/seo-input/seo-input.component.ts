import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'lib-seo-input',
  template: `
    <div class="form-floating mb-3">
      <input type="text" [(ngModel)]="seo.title" class="form-control" id="" placeholder="name@example.com" (ngModelChange)="updated()">
      <label for="">Title</label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" [(ngModel)]="seo.description" class="form-control" id="description" placeholder="name@example.com" (ngModelChange)="updated()">
      <label for="description">Description</label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" [(ngModel)]="seo.keywords" class="form-control" id="keywords" placeholder="name@example.com" (ngModelChange)="updated()">
      <label for="keywords">Keywords</label>
    </div>

    <div class="form-floating mb-3">
      <input type="text" [(ngModel)]="seo.canonical_link" class="form-control" id="" placeholder="name@example.com" (ngModelChange)="updated()">
      <label for="">Canonical Link</label>
    </div>

    <div class="form-group mb-3">
      <label class="form-label" for="">Robots Meta Tag</label>
      <p-selectButton [(ngModel)]="seo.robot" [options]="robotTags" (ngModelChange)="updated()"></p-selectButton>
    </div>

    <div class="form-label">Open Graph Image</div>
    <app-image-upload [(ngModel)]="seo.image" url="/api/upload/og-images" (ngModelChange)="updated()"></app-image-upload>
  `,
  styleUrls: ['./seo-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SeoInputComponent)
    }
  ]
})
export class SeoInputComponent implements OnInit, ControlValueAccessor {
  public robotTags = ['FOLLOW', 'INDEX', 'NOFOLLOW', 'NOINDEX']

  public seo = {
    title: null,
    image: null,
    canonical_link: null,
    description: null,
    keywords: null,
    robot: 'FOLLOW',
    tags: null
  }

  public _change = (_) => {
  }

  constructor(public cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this._change = fn
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    if (obj) {
      this.seo = obj
    }
    this.cd.detectChanges();
  }

  updated() {
    this._change(this.seo);
  }
}
