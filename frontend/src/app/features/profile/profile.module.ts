import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { ProfileNavbarComponent } from './components/profile-navbar/profile-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    ProfileComponent,
    RecipeFormComponent,
    ProfileNavbarComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FontAwesomeModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule
  ]
})
export class ProfileModule { }
