import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputPasswordComponent,
      multi: true
    }
  ]
})
export class InputPasswordComponent extends DefaultValueAccessor{
  readonly closedEye = faEye;
  readonly openEye = faEyeSlash;
  view: boolean = false;

  toggleVisibility() {
    this.view = !this.view;
  }

  setValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
    this.onTouched();
  }
}
