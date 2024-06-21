import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchRecipesComponent } from './pages/search-recipes/search-recipes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    RecipeDetailComponent,
    SearchRecipesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
