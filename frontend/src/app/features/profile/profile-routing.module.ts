import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { RecipeFormComponent } from './pages/recipe-form/recipe-form.component';
import { roleGuardGuard } from 'src/app/core/guards/role-guard.guard';
import { Role } from 'src/app/auth/models/role.enum';
import { UserRecipesComponent } from './pages/user-recipes/user-recipes.component';

const routes: Routes = [{
  path: '', component: ProfileComponent, children: [
    { path: "new-recipe", component: RecipeFormComponent, canActivate: [roleGuardGuard(Role.CREATOR)] },
    { path: "your-recipes", component: UserRecipesComponent, canActivate: [roleGuardGuard(Role.CREATOR)] }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
