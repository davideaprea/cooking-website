import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './components/form/input-text/input-text.component';
import { InputPasswordComponent } from './components/form/input-password/input-password.component';
import { InputCheckboxComponent } from './components/form/input-checkbox/input-checkbox.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputEmailComponent } from './components/form/input-email/input-email.component';

@NgModule({
  declarations: [
    InputTextComponent,
    InputPasswordComponent,
    InputCheckboxComponent,
    InputEmailComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InputCheckboxComponent,
    InputPasswordComponent,
    InputTextComponent,
    InputEmailComponent
  ]
})
export class SharedModule { }
