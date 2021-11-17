import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../../../src/app/services/api.service";
import {ToastrService} from "ngx-toastr";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'lib-media-manager',
  styleUrls: ['lib-media-manager.scss'],
  templateUrl: 'lib-media-manager.html',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: MediaManagerComponent, multi: true}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaManagerComponent implements OnInit, ControlValueAccessor {
  readonly SINGLE_SELECTION_MODE = 0;
  readonly MULTIPLE_SELECTION_MODE = 1;
  public onchange: any = () => {
  };
  @Input() items = [];
  @Input() selectionMode = this.SINGLE_SELECTION_MODE;
  @Input() api: ApiService;
  @Input() uploadUrl;
  @ViewChild('file') fileInput;
  public page = 1;
  public selectedItems = [];
  public currentItem = {
    id: 0,
    title: '',
    alt_text: '',
    description: '',
    caption: ''
  }

  constructor(public toast: ToastrService, public cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.load(1);
  }

  load(page = 1) {
    this.api.get('media-library/list', {page: page}).subscribe((res: any) => {
      this.items = res.data;
      this.cd.detectChanges();

    })
  }

  selectItem(item: any) {
    if (this.selectionMode == this.SINGLE_SELECTION_MODE) {
      this.selectedItems = [];
      this.selectedItems = [...this.selectedItems, item.id];
    } else {
      let index = this.selectedItems.indexOf(item.id);
      if (this.currentItem && this.currentItem.id == item.id) {
        this.currentItem = null;
      } else {
        this.currentItem = item;
      }
      if (index > -1) {
        //dont remove in image click . we clear from clear buton only

        // return;
        // this.selectedItems.splice(index, 1);
      } else {
        this.selectedItems = [...this.selectedItems, item.id]
      }
    }
    this.cd.detectChanges();
  }

  fileSelectionUpdated($event) {
    let files = $event.target.files;
    console.log(files);
  }

  filesUploaded(e) {
    this.toast.success("Files uploaded");
    this.load(1);
    this.cd.detectChanges();
  }

  selectionDone() {
    this.onchange(this.selectedItems);
  }

  registerOnChange(fn: any): void {
    this.onchange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.selectedItems = obj;
  }

  timeOut;
  timeOutDuration = 500;
  savingMeta = false;

  updateCurrentItem() {

    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.savingMeta = true;
      this.cd.detectChanges();
      this.api.post('media-library/update', this.currentItem)
        .pipe(finalize(() => {
          this.savingMeta = false;
          this.cd.detectChanges();
        }))
        .subscribe((res: any) => {
          //this.load(this.page);
        });
    }, this.timeOutDuration);


  }
}
