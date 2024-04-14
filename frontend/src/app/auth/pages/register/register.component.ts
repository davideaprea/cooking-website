import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FormModel } from 'src/app/core/models/form-model.type';
import { RegUser } from '../../models/reg-user.type';
import { RegUserFormModel } from '../../models/reg-user-form-model.type';
import { BaseReactiveForm } from 'src/app/core/models/base-reactive-form.class';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent extends BaseReactiveForm<RegUserFormModel>{
  protected form: FormGroup<FormModel<RegUserFormModel>> = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$")]),
    confirmPassword: new FormControl("", [Validators.required, (control: AbstractControl): ValidationErrors | null => {
      const password = control.parent?.get('password')?.value;
      return control.value === password ? null : { notEqualPasswords: true };
    }]),
    username: new FormControl("", Validators.required),
    newsletter: new FormControl(false),
    info: new FormControl(false, Validators.required),
    terms: new FormControl(false, Validators.required)
  });
  error?: string;

  readonly checkboxes = [
    { id: "info", label: "Dichiaro di aver preso visione dell'Informativa fornita ai sensi dell'art. 13 del Regolamento (UE) 2016/679*", control: this.form.controls.info },
    { id: "terms", label: "Dichiaro di aver preso visione delle Condizioni e Termini d'Uso del sito*", control: this.form.controls.terms },
    { id: "ns", label: "Subscribe to our newsletter", control: this.form.controls.newsletter },
  ];

  constructor(private authService: AuthService) {
    super();
  }

  submit() {
    const { confirmPassword, ...user } = this.form.value;
    this.authService.register(user as Required<RegUser>).subscribe({
      next: res => { },
      error: e => this.error = e,
    });
  }
}
