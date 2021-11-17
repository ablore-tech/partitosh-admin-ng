import {HttpErrorResponse} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {forEach} from "lodash-es";

export class BaseComponent {
  public displayServerErrors(response: HttpErrorResponse, form: FormGroup) {
    console.log(response.status)
    if (response.status !== 422) return;
    forEach(response.error.errors, (value, key) => {
      forEach(value, (err) => {
        form.controls[key].setErrors({'test': err});
      })
    })
  }

  restForm(form: FormGroup) {
    form.markAsUntouched();
    Object.keys(form.controls).forEach(field => { // {1}

      const control = form.get(field);            // {2}
      control.markAsUntouched();       // {3}
      control.markAsPristine();
      control.markAsPending();
      control.setErrors(null, {emitEvent: true});
      if ((control as FormGroup).controls) {
        this.restForm((control as FormGroup));
      }
    });
    form.updateValueAndValidity();
  }

  public runFormValidation(form: FormGroup) {

    Object.keys(form.controls).forEach(field => { // {1}
      const control = form.get(field);            // {2}
      control.markAsDirty();       // {3}
      control.markAsTouched();
      if ((control as FormGroup).controls) {
        this.runFormValidation((control as FormGroup));
      }
      if (control.invalid) { //
        console.log(field);
      }
    });
    form.markAllAsTouched();

  }

}
