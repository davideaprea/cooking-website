import { Directive, Input } from "@angular/core";

@Directive()
export abstract class InputLabel{
  @Input() label?: string;
  @Input() id?: string;
}
