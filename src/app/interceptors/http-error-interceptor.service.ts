// src/app/services/interceptor.service.ts
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";
import {CsrfService} from "../services/csrf.service";
import {Router} from "@angular/router";
import {LOGIN} from "../ROUTES";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(public toast: ToastrService, public csrfService: CsrfService, public router: Router) {
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    switch (error.status) {
      case 401:
        this.toast.error('You are not authenticated for this action', 'Sample Error');
        this.router.navigate([LOGIN]).then();
        break;
      case 419:
        this.csrfService.refreshCsrf().subscribe();
        this.router.navigate([LOGIN]).then();
        break;
      case 404:
        break;
      case 500:
        this.toast.error('Something went wrong.Please notify developer', 'Error');
        break;
      case 0:
        this.toast.error('Server is offline', 'Error');
    }
    return throwError(error);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap((response: HttpResponse<any>) => {
          if (!response.body) return;
          let message = response.body.message ?? null;
          if (message) {
            switch (response.body.type) {
              case 'success':
                this.toast.success(message);
                break;
              case 'error':
                this.toast.error(message);
                break;
            }
          }
        }),
        catchError(error => {
          return this.handleError(error);
        })
      )
  };
}
