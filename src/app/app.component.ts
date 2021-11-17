import {Component} from '@angular/core';
import {ApiService} from "./services/api.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book-your-own';

  constructor(public api: ApiService) {
    this.api.refreshCsrf().subscribe();
  }

}
