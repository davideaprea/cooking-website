import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegUser } from '../models/reg-user.type';
import { Router } from '@angular/router';
import { BehaviorSubject, map, tap } from 'rxjs';
import { LogUser } from '../models/log-user.type';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RawUser } from '../models/raw-user.type';
import { environment } from 'src/environments/environment.development';
import { DecodedToken } from '../models/decoded-token.type';
import { User } from '../models/user.type';
import { UtilityService } from 'src/app/core/services/utility.service';
import { LogUserFormModel } from '../models/log-user-form-model.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rawUser$ = new BehaviorSubject<undefined | RawUser>(undefined);

  user$ = this.rawUser$.asObservable().pipe(
    map(rawUser => {
      if (!rawUser) return undefined;

      const decodedToken: DecodedToken = this.jwtHelper.decodeToken(rawUser.accessToken)!;
      return <User>{
        username: rawUser.username,
        role: decodedToken.role[0].roleName,
        accessToken: rawUser.accessToken,
        tokenType: rawUser.tokenType
      }
    })
  );

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private utilityService: UtilityService) {
    const localStorageUser = utilityService.getLocalStorageItem<RawUser>("user");
    const sessionStorageUser = utilityService.getSessionStorageItem<RawUser>("user");
    this.rawUser$.next(localStorageUser || sessionStorageUser);
  }

  register(user: RegUser) {
    return this.http.post(environment.register, user);
  }

  login(userModel: LogUserFormModel) {
    const {remember, ...user} = userModel;
    return this.http.post<RawUser>(environment.login, user as LogUser).pipe(
      tap(
        user => {
          this.rawUser$.next(user);

          if (remember) localStorage.setItem("user", JSON.stringify(user));
          else sessionStorage.setItem("user", JSON.stringify(user));
        }
      )
    )
  }

  logout() {
    this.rawUser$.next(undefined);
    if (localStorage.getItem("user")) localStorage.removeItem("user");
    else sessionStorage.removeItem("user");
    this.router.navigate(["/home", ""]);
  }
}
