import {NgModule} from '@angular/core';
import {MediaManagerComponent} from './media-manager.component';
import {CommonModule} from "@angular/common";
import { UploaderComponent } from './components/uploader/uploader.component';
import {FileUploadModule} from "primeng/fileupload";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  declarations: [
    MediaManagerComponent,
    UploaderComponent
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    FormsModule,
    InputTextModule
  ],
  exports: [
    MediaManagerComponent
  ]
})
export class MediaManagerModule {
}
