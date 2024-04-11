import { FormArray, FormGroup } from "@angular/forms";
import { FormModel } from "./form-model.type";

export abstract class BaseReactiveForm<T> {
  protected abstract _form: FormGroup<FormModel<T>>;
  abstract submit(): void;

  get form() {
    return this._form;
  }

  /* markControlsErrors(control: FormArray | FormGroup): void {
    if (control instanceof FormArray && control.controls.every(subControl => subControl instanceof FormGroup)) {
      control.controls.forEach(control => this.markControlsErrors(control as FormGroup));
    }

    const controls = control instanceof FormArray ? control.controls : Object.values(control.controls);

    controls
      .filter(control => control.invalid)
      .forEach(control => {
        control.markAsDirty();
        control.markAsTouched();
      });
  } */
}
