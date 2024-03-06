import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { BaseFormInput } from 'src/app/shared/models/base-form-input';

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputCheckboxComponent extends BaseFormInput<boolean>{
  readonly checkIcon = faCheck;
}
