import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputCheckboxComponent } from './forms/components/input-checkbox/input-checkbox.component';
import { InputEmailComponent } from './forms/components/input-email/input-email.component';
import { InputPasswordComponent } from './forms/components/input-password/input-password.component';
import { InputTextComponent } from './forms/components/input-text/input-text.component';
import { DialogComponent } from './ui/dialog/dialog.component';

@NgModule({
  declarations: [
    InputTextComponent,
    InputPasswordComponent,
    InputCheckboxComponent,
    InputEmailComponent,
    DialogComponent
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
    InputEmailComponent,
    DialogComponent
  ]
})
export class SharedModule { }
