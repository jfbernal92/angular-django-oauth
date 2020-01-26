import { Routes } from './../../config/routes.config';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { ColumnHeader } from 'src/app/interfaces/columnHeader.interface';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
  providers: [UserService]
})
export class ManagementComponent implements OnInit {

  userList: User[];
  clonedUserList: { [id: number]: User; } = {};
  user = new User();

  columnHeaders: ColumnHeader[];

  ngOnInit(): void {
    this.columnHeaders = [
      { field: 'first_name', header: 'First Name' },
      { field: 'last_name', header: 'Last Name' },
      { field: 'iban', header: 'IBAN' }
    ];
  }

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }


  signOut(): void {
    this.authService.signOut();
    this.router.navigate([Routes.HOME]);
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
    return this.userService.deleteUser(user).subscribe(() => {
      this.getUsers();
    });
  }

  onRowEditInit(user: User) {
    this.clonedUserList[user.id] = { ...user };
  }

  onRowEditSave(user: User) {
    delete this.clonedUserList[user.id];
    this.updateUser(user);
  }

  onRowEditCancel(user: User, index: number) {
    this.userList[index] = this.clonedUserList[user.id];
    delete this.clonedUserList[user.id];
  }

  onRowDelete(user: User) {
    delete this.clonedUserList[user.id];
    this.deleteUser(user);
  }

}
