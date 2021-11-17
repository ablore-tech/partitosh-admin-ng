import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CsrfService extends ApiService {

  constructor(public http: HttpClient, public router: Router, public toast: ToastrService) {
    super(http, router, toast);
  }

  refresh() {
    return this.http.get('/sanctum/csrf-cookie');
  }
}
