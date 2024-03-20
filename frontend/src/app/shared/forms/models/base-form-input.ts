import { Directive, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Directive()
export abstract class BaseFormInput<T>{
  @Input() control!: FormControl<T>;
  @Input() id?: string;
  @Input() label?: string;
  @Input() errorMessage?: string;
}
