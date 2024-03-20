import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Form } from 'src/app/core/models/form';
import { BaseFormInput } from 'src/app/shared/forms/models/base-form-input';

/* const Mixin = formGroupGetters(
  class implements Form {
    form: FormGroup = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      name: new FormControl(""),
      newsletter: new FormControl(false)
    });
  }
); */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$")]),
    confirmPassword: new FormControl("", [Validators.required, (control: AbstractControl): ValidationErrors | null => {
      const password = control.parent?.get('password')?.value;
      return control.value === password ? null : { notEqualPasswords: true };
    }]),
    username: new FormControl("", Validators.required),
    name: new FormControl(""),
    newsletter: new FormControl(false),
    info: new FormControl(false),
    terms: new FormControl(false)
  });
  error?: string;

  readonly checkboxes: Partial<BaseFormInput<boolean>>[] = [
    { id: "info", label: "Dichiaro di aver preso visione dell’Informativa fornita ai sensi dell'art. 13 del Regolamento (UE) 2016/679*", control: this.form.controls["info"] as FormControl },
    { id: "terms", label: "Dichiaro di aver preso visione delle Condizioni e Termini d'Uso del sito*", control: this.form.controls["terms"] as FormControl },
    { id: "ns", label: "Subscribe to our newsletter", control: this.form.controls["newsletter"] as FormControl },
  ];

  constructor(private authService: AuthService) { }

  get confirmPasswordControl(){
    return this.form.get("confirmPassword") as FormControl;
  }

  get passwordControl(){
    return this.form.get("password") as FormControl;
  }

  submit() {
    this.authService.register(this.form.value).subscribe({
      next: res => { },
      error: e => this.error = e,
    });
  }
}
