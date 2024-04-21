import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { RecipeFormComponent } from './pages/recipe-form/recipe-form.component';
import { roleGuardGuard } from 'src/app/core/guards/role-guard.guard';
import { Role } from 'src/app/auth/models/role.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new-recipe',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: "new-recipe",
        component: RecipeFormComponent,
        canActivate: [roleGuardGuard(Role.CREATOR)]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
