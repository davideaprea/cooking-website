import { Directive, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Directive()
export abstract class BaseFormInput<T>{
  @Input({ required: true }) group!: FormGroup;
  @Input({ required: true }) control!: FormControl;
  @Input() value?: T;
  @Input() id?: string;
  @Input() label?: string;
  @Input() readonly: boolean = false;
}
