import { FormArray, FormControl, FormGroup } from "@angular/forms";

type Primitive = string | number | boolean;

type PayloadObject = {
  [key: string]:
  Primitive
  | PayloadObject
  | string[]
  | number[]
  | boolean[]
  | PayloadObject[];
};

type GroupOrControl<T> = T extends PayloadObject ? FormGroup<FormModel<T>> : FormControl<T | null>;

export type FormModel<T> = {
  [Property in keyof T]-?: T[Property] extends (infer U)[] ?
  FormArray<GroupOrControl<U>> :
  FormControl<T[Property] | null>;
};
