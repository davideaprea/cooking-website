import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseFormInput } from '../../models/base-form-input';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFileComponent extends BaseFormInput{

}
