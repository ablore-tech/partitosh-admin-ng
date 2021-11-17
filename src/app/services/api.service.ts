import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: HttpClient,
    public router: Router,
    public toast: ToastrService
  ) {

  }

  post(path: string, data: any) {
    let endpoint = environment.endpoint + path;
    return this.http.post(endpoint, data)


  }

  get(path: string, data: any) {

    let endpoint = environment.endpoint + path;
    return this.http.get(endpoint, {
      params: data
    })
  }


  public upload(path: string, data: any) {

    let endpoint = environment.endpoint + path;


    return this.http.post(endpoint, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            // @ts-ignore
            const progress = Math.round(100 * event.loaded / event.total);
            return {status: 'progress', message: progress};
          case HttpEventType.Response:
            return {files: event.body};
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    );
  }

  private showToast(res: any) {
    if (res.toast) {
      switch (res.type) {
        case 'OK':
          this.toast.success(res.toast, 'Success', {timeOut: 1000});
          break;
        case 'FAIL':
          this.toast.error(res.toast, 'Failed', {timeOut: 3000});
          break;
      }
    }
  }

  public refreshCsrf() {
    return this.http.get('/sanctum/csrf-cookie');
  }
}
