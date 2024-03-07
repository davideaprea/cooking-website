import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BaseFormInput } from 'src/app/shared/models/base-form-input';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  form!: FormGroup;
  error?: string;

  readonly checkboxes: BaseFormInput<boolean>[] = [
    { id: "info", label: "Dichiaro di aver preso visione dell’Informativa fornita ai sensi dell'art. 13 del Regolamento (UE) 2016/679", control: this.newsletter },
    { id: "terms", label: "Dichiaro di aver preso visione delle Condizioni e Termini d'Uso del sito", control: this.newsletter },
    { id: "ns", label: "Subscribe to our newsletter", control: this.newsletter },
  ];

  constructor(private authService: AuthService) {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      name: new FormControl(""),
      newsletter: new FormControl(false)
    });
  }

  get newsletter() {
    return this.form.get("newsletter")!;
  }

  submit() {
    this.authService.register(this.form.value).subscribe({
      next: res => { },
      error: e => this.error = e,
    });
  }
}
