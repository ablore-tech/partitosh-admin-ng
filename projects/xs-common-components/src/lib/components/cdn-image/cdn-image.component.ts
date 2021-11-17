import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {environment} from "../../../../../../src/environments/environment";

@Component({
  selector: 'app-cdn-image',
  templateUrl: './cdn-image.component.html',
  styleUrls: ['./cdn-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdnImageComponent implements AfterViewInit, OnChanges {
  @Input() src;
  @Input() svg = false;
  @Input() fallbackSrc;
  @Input() default;
  @Input() width = 100;
  @Input() height = 100;

  public finalUrl;

  constructor() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.process();
    });
  }

  process() {
    if (this.src) {
      this.finalUrl = environment.baseUrl + this.src.replace('public', 'storage')
    } else {
      this.finalUrl = this.fallbackSrc + '?t=' + Math.random();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.process();
  }
}
