import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { RecipeFormComponent } from './pages/recipe-form/recipe-form.component';
import { ProfileNavbarComponent } from './components/profile-navbar/profile-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { UserRecipesComponent } from './pages/user-recipes/user-recipes.component';

@NgModule({
  declarations: [
    ProfileComponent,
    RecipeFormComponent,
    ProfileNavbarComponent,
    UserRecipesComponent,
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
