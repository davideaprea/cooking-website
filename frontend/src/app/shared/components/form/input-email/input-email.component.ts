import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseFormInput } from 'src/app/shared/models/base-form-input';

@Component({
  selector: 'app-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputEmailComponent extends BaseFormInput{

}
