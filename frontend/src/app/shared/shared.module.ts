import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputCheckboxComponent } from './forms/components/input-checkbox/input-checkbox.component';
import { InputEmailComponent } from './forms/components/input-email/input-email.component';
import { InputPasswordComponent } from './forms/components/input-password/input-password.component';
import { InputTextComponent } from './forms/components/input-text/input-text.component';
import { DialogComponent } from './ui/dialog/dialog.component';
import { ElementBlurDirective } from './directives/element-blur.directive';
import { InputSelectComponent } from './forms/components/input-select/input-select.component';
import { InputFileComponent } from './forms/components/input-file/input-file.component';

@NgModule({
  declarations: [
    InputTextComponent,
    InputPasswordComponent,
    InputCheckboxComponent,
    InputEmailComponent,
    DialogComponent,
    ElementBlurDirective,
    InputSelectComponent,
    InputFileComponent
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
    DialogComponent,
    InputSelectComponent,
    ElementBlurDirective,
    InputFileComponent
  ]
})
export class SharedModule { }
