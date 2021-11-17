import {Directive, ElementRef, Input} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Directive({
  selector: '[appShowForRoles]'
})
export class ShowForRolesDirective {

  @Input('appShowForRoles') roles: string[];

  constructor(private ref: ElementRef<HTMLElement>, public auth: AuthService) {
  }

  ngAfterViewInit(): void {
    let user = this.auth.user;
    if (user && user.roles.length > 0 && this.roles.indexOf(user.roles[0].name) > -1) {
      // if (!this.roles.indexOf(this.auth.user.roles[0].name) > -1) {
      //}
    } else {
      this.ref.nativeElement?.remove();
    }
  }

}
