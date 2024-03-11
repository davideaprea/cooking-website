import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userLoggedGuard } from './auth/guards/user-logged.guard';
import { userNotLoggedGuard } from './auth/guards/user-not-logged.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [userLoggedGuard] },
  { path: 'profile', loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)/* , canActivate: [userNotLoggedGuard] */ }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
