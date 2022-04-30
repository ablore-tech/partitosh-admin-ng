import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { IUser } from "../interfaces/ILoginResponse";
import { GlobalLoaderService } from "./global-loader.service";
import { ApiService } from "./api.service";
import { finalize } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public loader: GlobalLoaderService, public api: ApiService) {
  }

  @LocalStorage()
  private _user: IUser;


  get user(): IUser {
    return this._user;
  }

  set user(user: IUser) {
    this._user = user;
  }

  logout() {
    this.loader.show();
    this.user = null;
    return of(true);
  }
}
