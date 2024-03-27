import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputCheckboxComponent } from './forms/components/input-checkbox/input-checkbox.component';
import { InputEmailComponent } from './forms/components/input-email/input-email.component';
import { InputPasswordComponent } from './forms/components/input-password/input-password.component';
import { InputTextComponent } from './forms/components/input-text/input-text.component';
import { DialogComponent } from './ui/dialog/dialog.component';
import { InputSelectComponent } from './forms/components/input-select/input-select.component';
import { InputFileComponent } from './forms/components/input-file/input-file.component';
import { CardComponent } from './ui/card/card.component';
import { InputNumberComponent } from './forms/components/input-number/input-number.component';
import { TextEditorComponent } from './forms/components/text-editor/text-editor.component';
import { QuillModule } from 'ngx-quill';
import { InputTimeComponent } from './forms/components/input-time/input-time.component';

@NgModule({
  declarations: [
    InputTextComponent,
    InputPasswordComponent,
    InputCheckboxComponent,
    InputEmailComponent,
    DialogComponent,
    InputSelectComponent,
    InputFileComponent,
    CardComponent,
    InputNumberComponent,
    TextEditorComponent,
    InputTimeComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule
  ],
  exports: [
    InputCheckboxComponent,
    InputPasswordComponent,
    InputTextComponent,
    InputEmailComponent,
    DialogComponent,
    InputSelectComponent,
    InputFileComponent,
    InputNumberComponent,
    TextEditorComponent,
    InputTimeComponent
  ]
})
export class SharedModule { }
