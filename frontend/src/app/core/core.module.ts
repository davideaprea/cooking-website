import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
