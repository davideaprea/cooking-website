import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { BaseFormInput } from '../../models/base-form-input';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class InputTextComponent<T> extends BaseFormInput<T> {

}
