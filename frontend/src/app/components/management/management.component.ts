import { Routes } from './../../config/routes.config';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { ColumnHeader } from 'src/app/interfaces/columnHeader.interface';
import { MessageService, Message } from 'primeng/api';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

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

  constructor(private authService: AuthService, private ms: MessageService, private userService: UserService, private router: Router) { }


  signOut(): void {
    this.authService.signOut();
    this.router.navigate([Routes.HOME]);
  }

  getUsers() {
    return this.userService.getUsers().subscribe(users => {
      this.userList = users;
    });
  }

  createUser(user: User) {
    return this.userService.createUser(user).subscribe(() => {
      this.getUsers();
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  updateUser(user: User, index?: number) {
    return this.userService.updateUser(user).subscribe(() => {
      delete this.clonedUserList[user.id];
      this.getUsers();
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
      this.onRowEditCancel(user, index);
    });
  }

  deleteUser(user: User) {
    return this.userService.deleteUser(user).subscribe(() => {
      delete this.clonedUserList[user.id];
      this.getUsers();
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  onRowEditInit(user: User) {
    this.clonedUserList[user.id] = { ...user };
  }

  onRowEditSave(user: User, index: number) {
    this.updateUser(user, index);
  }

  onRowEditCancel(user: User, index: number) {
    this.userList[index] = this.clonedUserList[user.id];
    delete this.clonedUserList[user.id];
  }

  onRowDelete(user: User) {
    this.deleteUser(user);
  }

  private handleError(error: HttpErrorResponse) {
    const errorList: Array<Message> = [];
    Object.keys(error.error).forEach((field: string) => {
      error.error[field].forEach(errors => {
        errorList.push({ severity: 'error', summary: field, detail: errors, life: 5000 });
      });
    });
    this.ms.addAll(errorList);
  }
}
