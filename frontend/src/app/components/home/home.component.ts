import { AuthService, SocialUser } from 'angularx-social-login';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GoogleLoginProvider } from 'angularx-social-login';
import { CommunicationService } from 'src/app/services/communication.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  user: SocialUser;
  communicationServiceSubscription: Subscription;

  constructor(private authService: AuthService, private cs: CommunicationService) {
  }

  ngOnInit() {
    this.communicationServiceSubscription = this.cs.userCredentials.subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    if (this.communicationServiceSubscription) {
      this.communicationServiceSubscription.unsubscribe();
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => this.user = user);
  }

}
