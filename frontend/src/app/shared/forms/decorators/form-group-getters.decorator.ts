import { FormControl } from "@angular/forms";
import { Form } from "src/app/core/models/form";

export const formGroupGetters = <T extends { new(...args: any[]): Form }>(constructor: T) => {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      for(const controlName in this.form.controls){
        Object.defineProperty(this, controlName+"Control", {
          get: () => this.form.controls[controlName] as FormControl
        });
      }
    }
  };
}
