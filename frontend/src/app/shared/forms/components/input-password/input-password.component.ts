import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ControlContainer, FormControl } from '@angular/forms';

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
export class InputPasswordComponent{
  @Input() control!: FormControl<string | null>;
  readonly closedEye = faEye;
  readonly openEye = faEyeSlash;
  view: boolean = false;

  toggleVisibility(){
    this.view = !this.view;
  }
}
