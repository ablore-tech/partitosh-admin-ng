import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NewEntryPointFileWriter} from "@angular/compiler-cli/ngcc/src/writing/new_entry_point_file_writer";
import {GlobalLoaderService} from "../../../services/global-loader.service";
import {finalize} from "rxjs/operators";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public options = [
    {label: 'Global'},
    {label: 'Home Page'},
  ];
  public settings: FormGroup;


  constructor(public loader: GlobalLoaderService, public api: ApiService) {
    this.settings = new FormGroup({
      invoice_email: new FormControl(),
      invoice_phone: new FormControl(),
      invoice_footer_text: new FormControl(),
    });

  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loader.show();
    this.api.post('settings?key=site', {})
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
        this.settings.patchValue(res);
      })
  }

  save(form: FormGroup) {
    this.loader.show();
    this.api.post('settings', this.settings.value)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((res: any) => {
      })
  }

  tabChanged() {

  }
}
