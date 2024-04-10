import { FormArray, FormControl, FormGroup } from "@angular/forms";

type GroupOrControl<T> = T extends object ? FormGroup<FormModel<T>> : FormControl<T | null>;

export type FormModel<T> = {
  [Property in keyof T]: T[Property] extends (infer U)[] ?
  FormArray<GroupOrControl<U>> :
  FormControl<T[Property] | null>;
};
