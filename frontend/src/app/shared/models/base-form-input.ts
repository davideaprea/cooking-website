import { Directive, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Directive()
export abstract class BaseFormInput<T>{
  @Input() group!: FormGroup;
  @Input() control!: FormControl;
  @Input() value?: T;
  @Input() id?: string;
  @Input() label?: string;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
}
