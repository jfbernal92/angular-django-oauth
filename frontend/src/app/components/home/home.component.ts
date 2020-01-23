import { User } from './../../models/user.model';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ColumnHeader } from 'src/app/interfaces/columnHeader.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  userCredentials: SocialUser;
  loggedIn: boolean;

  userList: User[];
  columnHeaders: ColumnHeader[];

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.userCredentials = user;
      console.log(user);
      this.loggedIn = (user != null);
    });

    this.columnHeaders = [
      { field: 'first_name', header: 'First Name' },
      { field: 'last_name', header: 'Last Name' },
      { field: 'iban', header: 'IBAN' }
    ];
  }

  constructor(private authService: AuthService, private userService: UserService) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  getUsers() {
    return this.userService.getUsers().subscribe(users => {
      this.userList = users;
    });
  }

  getUser(id: number) {
    return this.userService.getUser(id).subscribe((user: User) => {

    });
  }

  createUser(user: User) {
    return this.userService.createUser(user).subscribe(() => {
      this.getUsers();
    });
  }

  updateUser(user: User) {
    return this.userService.updateUser(user).subscribe(() => {
      this.getUsers();
    });
  }

  deleteUser(user: User) {
    return this.userService.updateUser(user).subscribe(() => {
      this.getUsers();
    });
  }

}
