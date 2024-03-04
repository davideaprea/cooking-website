import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LogUser } from '../../models/log-user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!:FormGroup;
  wrongCredentials=false;

  constructor(private authService:AuthService){
    this.form=new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      remember: new FormControl<boolean>(false)
    });
  }

  submit(){
    const credentials:LogUser={
      username: this.form.value.email,
      password: this.form.value.password
    }

    this.authService.login(credentials, this.form.value.remember[0]).subscribe(
      {
        error: e => {
          this.wrongCredentials=true;
          this.form.reset();
        }
      }
    );
  }
}
