import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseFormInput } from 'src/app/shared/models/base-form-input';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPasswordComponent extends BaseFormInput{
  readonly closedEye = faEye;
  readonly openEye = faEyeSlash;
  view: boolean = false;

  toggleVisibility(event: Event){
    event.preventDefault();
    this.view = !this.view;
  }
}
