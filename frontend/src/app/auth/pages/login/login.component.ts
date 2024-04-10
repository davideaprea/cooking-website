import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FormModel } from 'src/app/core/models/form-model.type';
import { LogUserFormModel } from '../../models/log-user-form-model.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private _form: FormGroup<FormModel<LogUserFormModel>> = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    remember: new FormControl<boolean>(false)
  });

  private wrongCredentials = false;

  constructor(private authService: AuthService) { }

  get form() {
    return this._form;
  }

  submit() {
    this.authService.login(this.form.value as Required<LogUserFormModel>).subscribe(
      {
        error: e => {
          this.wrongCredentials = true;
          this.form.reset();
        }
      }
    );
  }
}
