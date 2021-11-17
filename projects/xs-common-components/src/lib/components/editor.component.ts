import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnDestroy} from "@angular/core";

@Component({
  selector: 'app-editor',
  template: `<textarea [froalaEditor]="options" [(froalaModel)]="value" (froalaModelChange)="changed()" (froalaInit)="initialize($event)"></textarea>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
    }
  ]
})
export class EditorComponent implements ControlValueAccessor, OnDestroy {

  public froala;
  public value = '';
  public emit = (_: any) => {
  };

  constructor(public cd: ChangeDetectorRef) {
  }

  public options = {
    key: 'AV:4~?3xROKLJKYHROLDXDR@d2YYGR_Bc1A8@5@4:1B2D2F2F1?1?2A3@1C1',//
    toolbarButtons: {
      moreText: {
        buttonsVisible: 100,

        buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
      },
      moreParagraph: {
        buttonsVisible: 100,


        buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
      },
      moreRich: {
        buttonsVisible: 100,

        buttons: ['insertLink', 'insertImage', 'insertVideo', 'insertTable',
          //  'emoticons', 'fontAwesome',
          //'specialCharacters',
          'embedly',
          // 'insertFile',
          'insertHR']
      },
      moreMisc: {
        buttonsVisible: 1,

        buttons: [
          //'undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll',
          'html', 'help'
        ],
        align: 'right',
      },

    },


    pasteAllowLocalImages: false,
    pasteAllowedStyleProps: ['font-family', 'font-size', 'color'],
    toolbarSticky: false,
    fontFamily: {
      'Times New Roman': 'Times New Roman',
      'Open Sans': 'Open sans',
      'Roboto,sans-serif': 'Roboto',
      'Oswald,sans-serif': 'Oswald',
      'Montserrat,sans-serif': 'Montserrat',
      '\'Open Sans Condensed\',sans-serif': 'Open Sans Condensed'
    },
    fontFamilySelection: true,
    imageUploadParam: 'file[]',
    imageUploadURL: '/api/upload?editor=true',
    attribution: false,
    minHeight: 200,
    heightMax: 600,
    zIndex: 99999999999999
  };

  registerOnChange(fn: any): void {
    this.emit = fn;
  }

  registerOnTouched(fn: any): void {

  }

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    } else {
      this.value = null;
    }
    this.cd.detectChanges();
  }

  changed() {
    this.emit(this.value);
  }

  public initialize(initControls) {
    this.froala = initControls;
    setTimeout(() => {
      initControls.initialize();
    }, 10);

  }

  ngOnDestroy() {
    this.froala.destroy();
  }

  reinit() {
    this.froala.initialize();
  }
}
