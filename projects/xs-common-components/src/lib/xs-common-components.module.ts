import {NgModule} from '@angular/core';
import {XsCommonComponentsComponent} from './xs-common-components.component';
import {LoadingButtonComponent} from "./components/loading-button.component";
import {CommonModule} from "@angular/common";
import {SeoInputComponent} from './components/seo-input/seo-input.component';
import {FormsModule} from "@angular/forms";
import {CdnImageComponent} from "./components/cdn-image/cdn-image.component";
import {ImageUploadComponent} from "./components/image-upload/image-upload.component";
import {EditorComponent} from "./components/editor.component";
import {GalleryUploadComponent} from './components/gallery-upload/gallery-upload.component';
import {BadgeComponent} from "./components/badge/badge.component";
import {SelectButtonModule} from "primeng/selectbutton";
import {FroalaEditorModule} from "angular-froala-wysiwyg";


@NgModule({
  declarations: [
    XsCommonComponentsComponent,
    LoadingButtonComponent,
    SeoInputComponent,
    CdnImageComponent,
    ImageUploadComponent,
    EditorComponent,
    GalleryUploadComponent,
    BadgeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FroalaEditorModule,
    SelectButtonModule,
  ],
  exports: [
    XsCommonComponentsComponent,
    LoadingButtonComponent,
    SeoInputComponent,
    CdnImageComponent,
    ImageUploadComponent,
    EditorComponent,
    GalleryUploadComponent,
    BadgeComponent
  ]
})
export class XsCommonComponentsModule {
}
