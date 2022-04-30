import { Component, OnInit, ViewChild } from '@angular/core';
import { ILaravelDataTableConfig } from '../../../../projects/xs-laravel-data-table/src/interfaces/ILaravelDataTableConfig';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { XsLaravelDataTableComponent } from '../../../../projects/xs-laravel-data-table/src/lib/xs-laravel-data-table.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from "../../../environments/environment";
import { LocalStorage } from "ngx-webstorage";
import { BaseComponent } from "../../base-component";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent extends BaseComponent implements OnInit {
  @ViewChild('table') table: XsLaravelDataTableComponent;
  public endpoint = 'blog/index';
  public displayAddNewModal = false;
  public form: FormGroup;
  public loading = false;
  public statusList = [
    { label: 'Publish', value: 'publish' },
    { label: 'Draft', value: 'draft' },
    { label: 'Pending', value: 'pending' },
  ];
  public postType = [
    { label: 'Post', value: 'Post' },
    { label: 'PDF', value: 'pdf' },
    { label: 'Podcast', value: 'podcast' },
  ];
  public dependOn = { categories: [], cities: [] }
  public config: ILaravelDataTableConfig = {
    fields: [
      { key: 'id', name: 'ID', width: 'min' },
      { key: 'title', name: 'Title', },
      { key: 'status', name: 'Status', width: 'min' },
      { key: 'created_at', name: 'Created', type: 'dateIST', width: 'min' },
    ]
  };

  constructor(public loader: NgxSpinnerService, public api: ApiService) {
    super();
    this.form = new FormGroup({
      id: new FormControl(),
      title: new FormControl('', [Validators.required]),
      sub_title: new FormControl(''),
      slug: new FormControl(),
      content: new FormControl(),
      image: new FormControl(null, [Validators.required]),
      full_image: new FormControl(null, [Validators.required]),
      status: new FormControl('publish', [Validators.required]),
      seo: new FormControl(),
      tags: new FormControl(),
      type: new FormControl(),
      meta_audio_or_pdf: new FormControl(),
      categories: new FormControl(),
      time_tag: new FormControl(),
      quote: new FormControl(),
      quote_description: new FormControl(),
    });
    this.loadData();
  }

  loadData() {
    this.api.get('blog/data', {})
      .subscribe((res: any) => {
        this.dependOn = res;
      })
  }

  ngOnInit(): void {
  }

  editBlog(item: any) {
    const tags = item.tags.map((tag) => {
      return tag.name;
    });
    const categories = item.categories.map((category) => {
      return category.id;
    });
    this.form.patchValue(item);
    this.form.patchValue({ tags, categories });
    this.displayAddNewModal = true;
  }

  submitForm() {
    if (this.form.invalid) {
      return this.runFormValidation(this.form);
    }
    this.loading = true;

    this.api.post('blog/create', this.form.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe((res: any) => {
        this.table.loadData();
        this.displayAddNewModal = false;
      });
  }

  delete(item) {
    this.loader.show();
    this.api.post('blog/destroy', { id: item.id })
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
        this.table.loadData();
      });
  }

  formDialogClosed() {
    this.form.reset({ status: 'publish', tags: [], 'categories': [] });
    console.log('closed');
  }

  closeDialog() {
    this.displayAddNewModal = false;
  }
}
