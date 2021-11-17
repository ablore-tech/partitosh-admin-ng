import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalLoaderService {
  private _visible = false;

  function

  show() {
    setTimeout(() => {
      this._visible = true;

    })
  }

  hide() {
    setTimeout(() => {

      this._visible = false
    })
  }

  get visible(): boolean {
    return this._visible;
  }

  constructor() {
  }
}
