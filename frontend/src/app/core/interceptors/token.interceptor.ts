import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private accToken: string | undefined = undefined;

  constructor(private authSvc: AuthService) {
    authSvc.user$.subscribe(user => this.accToken = user?.accessToken);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.accToken) {
      const reqClone = request.clone(
        {
          headers: request.headers.set('Authorization', 'Bearer ' + this.accToken)
        }
      );
      return next.handle(reqClone);
    }
    return next.handle(request);
  }
}
