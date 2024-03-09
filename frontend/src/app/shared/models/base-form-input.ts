import { Directive, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Directive()
export abstract class BaseFormInput{
  @Input({ required: true }) group!: FormGroup;
  @Input({ required: true }) control!: FormControl;
  @Input() id?: string;
  @Input() label?: string;
}
