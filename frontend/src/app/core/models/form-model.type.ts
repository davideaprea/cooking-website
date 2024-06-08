import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { JsonObject } from "./backend-dto/json-object.type";

type GroupOrControl<T> = T extends JsonObject ? FormGroup<FormModel<T>> : FormControl<T | null>;

export type FormModel<T> = {
  [Property in keyof T]-?: T[Property] extends (infer U)[] ?
  FormArray<GroupOrControl<U>> :
  FormControl<T[Property] | null>;
};
