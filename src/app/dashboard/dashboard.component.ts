import {Component, OnInit} from '@angular/core';
import {GlobalLoaderService} from "../services/global-loader.service";
import {finalize} from "rxjs/operators";
import {ApiService} from "../services/api.service";
import loader from "@angular-devkit/build-angular/src/webpack/plugins/single-test-transform";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {LOGIN} from "../ROUTES";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public menu: IMenuItem[] = [
    {label: 'Users', icon: 'pi pi-user', routerLink: 'user'},
    {label: 'Blogs', icon: 'fa fa-file-text', routerLink: 'blog'},
    {label: 'Blog Categories', icon: 'fa fa-paperclip', routerLink: 'blog-categories'},
    {label: 'Contact Forms', icon: 'fa fa-paperclip', routerLink: 'contact-form'},
  ]

  constructor(public auth: AuthService, public loader: GlobalLoaderService, public api: ApiService, public router: Router) {

  }

  ngOnInit(): void {

  }

  logout() {
    this.auth.logout().subscribe((res) => {
      this.auth.user = null;
      this.api.refreshCsrf().subscribe();
      this.router.navigate([LOGIN]).then();
    })
  }
}
