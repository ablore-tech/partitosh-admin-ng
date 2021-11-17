import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {IUser} from "../interfaces/ILoginResponse";
import {AuthService} from "../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {BaseComponent} from "../base-component";
import {Router} from "@angular/router";
import {BOOKINGS, DASHBOARD} from "../ROUTES";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  public loginForm: FormGroup;
  public loading = false;
  public errorMessage = null;

  constructor(public api: ApiService, public auth: AuthService, public router: Router) {
    super();
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.errorMessage = null;
    if (this.loginForm.invalid) {
      return this.runFormValidation(this.loginForm);
    }
    this.loading = true
    this.api.post('login', this.loginForm.value)
      .pipe(finalize(() => {
        this.loading = false
      }))
      .subscribe((user: IUser) => {
        this.auth.user = user;
        this.router.navigate(['dashboard']).then();

      }, (err: HttpErrorResponse) => {
        this.displayServerErrors(err, this.loginForm);
        if ([404, 403].indexOf(err.status) > -1) {
          this.errorMessage = err.error.message;
        }
      });
  }


}
