import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SampleComponent} from './sample.component';
import {MediaManagerModule} from "../../../../projects/media-manager/src/lib/media-manager.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    SampleComponent
  ],
  imports: [
    CommonModule,
    MediaManagerModule,
    RouterModule.forChild([
      {path: '', component: SampleComponent}
    ])
  ]
})
export class SampleModule {
}
