import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseFormInput } from 'src/app/shared/models/base-form-input';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextComponent extends BaseFormInput{

}
