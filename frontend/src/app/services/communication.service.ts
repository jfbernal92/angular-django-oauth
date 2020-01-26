import { SocialUser } from 'angularx-social-login';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class CommunicationService {

  private user = new BehaviorSubject<SocialUser>(null);
  userCredentials = this.user.asObservable();

  constructor() { }

  updatedUserCredentials(user: SocialUser) {
    this.user.next(user);
  }
}
