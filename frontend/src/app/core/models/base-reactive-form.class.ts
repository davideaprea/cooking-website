import { FormGroup } from "@angular/forms";
import { FormModel } from "./form-model.type";

export interface BaseReactiveForm<T> {
  form: FormGroup<FormModel<T>>;
  submit(...args: any[]): void;
}
