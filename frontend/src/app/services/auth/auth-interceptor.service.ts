import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { AuthService, SocialUser } from 'angularx-social-login';
import { SecurityConstants } from 'src/app/config/security-constants.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private user: SocialUser;
  constructor(private authService: AuthService) {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.user.idToken;
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(SecurityConstants.TOKEN_HEADER_KEY, `${SecurityConstants.TOKEN_PREFIX} ${token}`)
      });
    }
    return next.handle(authReq);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
