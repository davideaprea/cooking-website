import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LogUser } from '../../models/log-user.type';
import { AuthService } from '../../services/auth.service';
import { FormModel } from 'src/app/core/models/form-model.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private _form: FormGroup<FormModel<LogUser>> = new FormGroup({
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
    this.authService.login(credentials, this.form.value.remember[0]).subscribe(
      {
        error: e => {
          this.wrongCredentials = true;
          this.form.reset();
        }
      }
    );
  }
}
