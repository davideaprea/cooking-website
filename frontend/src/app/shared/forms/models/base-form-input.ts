import { Directive, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Directive()
export abstract class BaseFormInput{
  @Input() control!: FormControl;
  @Input() id?: string;
  @Input() label?: string;
  @Input() errorMessage?: string;
}
