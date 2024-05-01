import { FormArray, FormControl, FormGroup } from "@angular/forms";

type PayloadObject = Record<string, string | number | boolean>;

type GroupOrControl<T> = T extends PayloadObject ? FormGroup<FormModel<T>> : FormControl<T | null>;

export type FormModel<T> = {
  [Property in keyof T]-?: T[Property] extends (infer U)[] ?
  FormArray<GroupOrControl<U>> :
  FormControl<T[Property] | null>;
};
