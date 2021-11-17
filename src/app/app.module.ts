import {ChangeDetectorRef, ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxWebstorageModule} from "ngx-webstorage";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./interceptors/token-interceptor.service";
import {ToastrModule} from "ngx-toastr";
import {HttpErrorInterceptorService} from "./interceptors/http-error-interceptor.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MESSAGES_PIPE_FACTORY_TOKEN, MESSAGES_PROVIDER, NgxValidationErrorsModule} from "@xtream/ngx-validation-errors";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {LoadingBtnPipe} from "./pipes/loading-btn.pipe";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
//import 'froala-editor/js/plugins/';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/code_beautifier.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/draggable.min.js';
import 'froala-editor/js/plugins/edit_in_popup.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/entities.min.js';
import 'froala-editor/js/plugins/file.min.js';
import 'froala-editor/js/plugins/files_manager.min.js';
import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/forms.min.js';
import 'froala-editor/js/plugins/fullscreen.min.js';
import 'froala-editor/js/plugins/help.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/image_manager.min.js';
import 'froala-editor/js/plugins/inline_class.min.js';
import 'froala-editor/js/plugins/inline_style.min.js';
import 'froala-editor/js/plugins/line_breaker.min.js';
import 'froala-editor/js/plugins/line_height.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/markdown.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/paragraph_style.min.js';
import 'froala-editor/js/plugins/print.min.js';
import 'froala-editor/js/plugins/quick_insert.min.js';
import 'froala-editor/js/plugins/quote.min.js';
import 'froala-editor/js/plugins/save.min.js';
import 'froala-editor/js/plugins/special_characters.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/track_changes.min.js';
import 'froala-editor/js/plugins/trim_video.min.js';
import 'froala-editor/js/plugins/url.min.js';
import 'froala-editor/js/plugins/video.min.js';
import 'froala-editor/js/plugins/word_paste.min.js';
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import {NgxSpinnerModule} from "ngx-spinner";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function translatePipeFactoryCreator(translateService: TranslateService) {
  return (detector: ChangeDetectorRef) => new TranslatePipe(translateService, detector);
}


@NgModule({
  declarations: [
    AppComponent,
    LoadingBtnPipe,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ConfirmationPopoverModule.forRoot({
            popoverMessage: "Are you sure?",
            confirmButtonType: 'danger', // set defaults here
        }),
        NgxValidationErrorsModule.forRoot(),
        NgxWebstorageModule.forRoot({
            prefix: 'byo', caseSensitive: false
        }),
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        NgxSpinnerModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true},
    {
      provide: MESSAGES_PIPE_FACTORY_TOKEN,
      useFactory: translatePipeFactoryCreator,
      deps: [TranslateService]
    },
    {
      provide: MESSAGES_PROVIDER,
      useExisting: TranslateService
    },
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
