import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userLoggedGuard } from './auth/guards/user-logged.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [userLoggedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
