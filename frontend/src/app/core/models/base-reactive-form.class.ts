import { FormArray, FormGroup } from "@angular/forms";
import { FormModel } from "./form-model.type";

export abstract class BaseReactiveForm<T> {
  protected abstract form: FormGroup<FormModel<T>>;
  abstract submit(): void;
}
