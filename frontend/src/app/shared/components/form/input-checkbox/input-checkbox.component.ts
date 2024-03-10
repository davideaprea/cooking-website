import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { BaseFormInput } from 'src/app/shared/models/base-form-input';

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class InputCheckboxComponent extends BaseFormInput {
  readonly checkIcon = faCheck;
}
