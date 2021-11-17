import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, forwardRef, Input, TemplateRef, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HttpClient, HttpEvent, HttpEventType} from '@angular/common/http';
import {environment} from "../../../../../../src/environments/environment";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true
    }
  ]
})
export class ImageUploadComponent implements ControlValueAccessor, AfterViewInit {
  @Input() public svg = false;
  @Input() public url = '/api/upload';
  @Input() public multiple = false;
  @Input() public withCredentials = true;
  @Input() public label = 'Upload';
  @Input() public dimensions;

  @ViewChild('fileInput') public fileInput;
  public value: any;
  public uploading = false;
  public directory: string;
  public progress = 0;
  public endpoint: string;

  public files = [];
  public uploadedFiles = [];
  public propagateChange = (_) => {
  };
  @ContentChild('preview', {static: true}) preview: TemplateRef<any>;

  constructor(public http: HttpClient, public cd: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {

  }

  writeValue(obj: any): void {
    if (obj) {
      this.uploadedFiles = this.multiple ? [] : [{path: obj}];
    } else {
      this.uploadedFiles = [];
    }
    this.cd.detectChanges();

  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  setDisabledState?(isDisabled: boolean): void {

  }

  public upload($event) {
    this.files = [...this.files, ...$event.target.files];
    const formData = new FormData();
    this.files.forEach((f) => {
      formData.append('file[]', f);
    });
    this.http.post(this.url, formData, {
      reportProgress: true,
      observe: 'events',
      withCredentials: this.withCredentials
    }).subscribe((event: HttpEvent<any>) => {
        this.files = $event.files;
        switch (event.type) {
          case HttpEventType.Response:
            this.uploading = false;
            this.progress = 0;
            if (this.multiple) {
              this.uploadedFiles = [...this.uploadedFiles, ...event.body];

            } else {
              this.uploadedFiles = [...event.body];
            }
            this.resetFileSelector();
            const res = this.multiple ? this.uploadedFiles : this.uploadedFiles[0];
            if (this.multiple) {
              this.propagateChange(res);
            } else {
              this.propagateChange(res.path);
            }
            break;
          case HttpEventType.UploadProgress:
            if (event.loaded) {
              this.progress = Math.round((event.loaded / event.total) * 100);
            }
            break;

        }
        this.cd.detectChanges();
        this.cd.markForCheck();
      },
      error => {
        this.uploading = false;
        //  this.onError.emit({files: this.files, error: error});
      });
  }

  resetFileSelector() {
    this.files = [];
    this.fileInput.nativeElement.value = '';
    this.propagateChange(null);

  }

  clearImage() {
    this.uploadedFiles = [];
    this.propagateChange(null);

    this.cd.detectChanges();
  }

  getFullUrl() {
    if (this.uploadedFiles[0] && this.uploadedFiles[0].path) {
      return environment.baseUrl + this.uploadedFiles[0].path.replace('public/', 'storage/')
    }
    return '';
  }
}
