import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { BaseFormInput } from 'src/app/shared/models/base-form-input';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ]
})
export class InputPasswordComponent extends BaseFormInput{
  readonly closedEye = faEye;
  readonly openEye = faEyeSlash;
  view: boolean = false;

  toggleVisibility(){
    this.view = !this.view;
  }
}
