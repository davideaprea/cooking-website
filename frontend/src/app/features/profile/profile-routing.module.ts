import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { RecipeFormComponent } from './pages/recipe-form/recipe-form.component';

const routes: Routes = [{
  path: '', component: ProfileComponent, children: [
    {path: "new-recipe", component: RecipeFormComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
