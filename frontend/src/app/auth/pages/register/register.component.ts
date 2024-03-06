import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  form!: FormGroup;
  error?: string;

  constructor(private authService: AuthService) {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      name: new FormControl(""),
      newsletter: new FormControl(false)
    });
  }

  get newsletter(){
    return this.form.get("newsletter");
  }

  submit() {
    this.authService.register(this.form.value).subscribe({
      next: res => { },
      error: e => this.error = e,
    });
  }
}
