import { FormControl } from "@angular/forms";
import { FormComponent } from "src/app/core/models/form-component";

export const formGroupGetters = <T extends { new(...args: any[]): FormComponent }>(constructor: T) => {
  return class Child extends constructor {
    constructor(...args: any[]) {
      super(...args);

      for(const controlName in this.form.controls){
        Object.assign(Child.prototype, controlName+"Control", {
          get: () => this.form.controls[controlName] as FormControl
        });
      }
    }
  };
}
