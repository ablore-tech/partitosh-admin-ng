import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, forwardRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {HttpClient, HttpEvent, HttpEventType} from "@angular/common/http";

@Component({
  selector: 'lib-gallery-upload',
  templateUrl: './gallery-upload.component.html',
  styleUrls: ['./gallery-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GalleryUploadComponent),
      multi: true
    }
  ]
})
export class GalleryUploadComponent implements ControlValueAccessor {
  @Input() public url = '/api/upload';
  @Input() public multiple = false;
  @Input() public withCredentials = true;
  @Input() public label = 'Upload';
  @Input() public dimensions;
  @ViewChild('fileInput') public fileInput;
  public uploading = false;
  public progress = 0;
  public endpoint: string;

  public files = [];
  public uploadedFiles = [];
  public propagateChange = (_) => {
  };

  constructor(public http: HttpClient, public cd: ChangeDetectorRef) {
  }

  trackByIndex(index: number, el: any): number {
    return index;
  }

  writeValue(obj: any): void {
    console.log(obj);
    if (obj) {
      this.uploadedFiles = obj
    }
    this.cd.detectChanges();
    this.propagateChange(obj);
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
            this.uploadedFiles = [...this.uploadedFiles, ...event.body.map((r) => {
              return r.path
            })];
            this.resetFileSelector();
            this.propagateChange(this.uploadedFiles);
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

  }

  clearImage() {
    this.uploadedFiles = [];
    this.propagateChange(this.uploadedFiles);
    this.cd.detectChanges();
  }

  removeImage(index: number) {
    this.uploadedFiles.splice(index, 1);
    this.cd.detectChanges();
    this.propagateChange(this.uploadedFiles);
  }
}
