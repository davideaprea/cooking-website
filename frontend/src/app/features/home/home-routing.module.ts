import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { SearchRecipesComponent } from './pages/search-recipes/search-recipes.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'recipes/:id',
        component: RecipeDetailComponent
      },
      {
        path: 'search/:name',
        component: SearchRecipesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
