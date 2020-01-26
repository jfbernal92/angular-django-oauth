import { AuthGuard } from './guards/auth.guard';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ManagementComponent } from './components/management/management.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { httpInterceptorProviders } from './services/auth/auth-interceptor.service';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { AngularIbanModule } from 'angular-iban';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';

import { CommunicationService } from './services/communication.service';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleClientID)
  }
]);

@NgModule({
  declarations: [
    AppComponent,
    ManagementComponent,
    HomeComponent,
  ],
  imports: [
    AngularIbanModule,
    AppRoutingModule,
    BrowserModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    TableModule
  ],
  providers: [
    httpInterceptorProviders,
    CommunicationService,
    AuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: () => config
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
