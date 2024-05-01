import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';


@NgModule({
  declarations: [
    HomeComponent,
    RecipeDetailComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
