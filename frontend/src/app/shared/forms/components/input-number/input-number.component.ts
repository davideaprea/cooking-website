import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseFormInput } from '../../models/base-form-input';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputNumberComponent extends BaseFormInput<number | undefined> {
}
