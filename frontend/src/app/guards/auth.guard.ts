import { Routes } from './../config/routes.config';
import { SocialUser } from 'angularx-social-login';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommunicationService } from '../services/communication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  private user: SocialUser;

  constructor(private cs: CommunicationService, private router: Router) {
    this.cs.userCredentials.subscribe(user => this.user = user);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean {
    if (this.user) {
      return true;
    }
    this.router.navigate([Routes.HOME]);
    return false;
  }
}
