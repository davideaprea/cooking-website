import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputPasswordComponent } from './forms/components/input-password/input-password.component';
import { DialogComponent } from './ui/dialog/dialog.component';
import { InputSelectComponent } from './forms/components/input-select/input-select.component';
import { InputFileComponent } from './forms/components/input-file/input-file.component';
import { CardComponent } from './ui/card/card.component';
import { InputTimeComponent } from './forms/components/input-time/input-time.component';
import { InputContainerComponent } from './forms/components/input-container/input-container.component';

@NgModule({
  declarations: [
    InputPasswordComponent,
    DialogComponent,
    InputSelectComponent,
    InputFileComponent,
    CardComponent,
    InputTimeComponent,
    InputContainerComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InputPasswordComponent,
    DialogComponent,
    InputSelectComponent,
    InputFileComponent,
    InputTimeComponent,
    InputContainerComponent
  ]
})
export class SharedModule { }
