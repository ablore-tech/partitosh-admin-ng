import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {RouterModule} from "@angular/router";
import {NgxValidationErrorsModule} from "@xtream/ngx-validation-errors";
import {ReactiveFormsModule} from "@angular/forms";
import {XsCommonComponentsModule} from "../../../projects/xs-common-components/src/lib/xs-common-components.module";
import {MediaManagerModule} from "../../../projects/media-manager/src/lib/media-manager.module";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: LoginComponent}
    ]),
    NgxValidationErrorsModule,
    ReactiveFormsModule,
    XsCommonComponentsModule,
    MediaManagerModule
  ]
})
export class LoginModule {
}
