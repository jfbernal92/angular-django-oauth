import { AuthService, SocialUser } from 'angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './services/communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private cs: CommunicationService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      this.cs.updatedUserCredentials(user);
    });
  }

}
