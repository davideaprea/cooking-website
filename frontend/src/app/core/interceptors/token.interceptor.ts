import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, firstValueFrom, take } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private accToken: string | undefined = undefined;

  constructor(private authSvc: AuthService) {
    authSvc.user$
    .pipe(
      take(1)
    )
    .subscribe(user => this.accToken = user?.accessToken);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let req;

    if (this.accToken) {
      req = request.clone(
        {
          headers: request.headers.set('Authorization', 'Bearer ' + this.accToken)
        }
      );
    }
    else req = request;

    return next.handle(req);
  }
}
