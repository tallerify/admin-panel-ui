import { Component, OnInit } from '@angular/core';
import { User } from '../_models';
import { UserService } from '../_services';
import { MdDialog, MdDialogRef } from '@angular/material';
import '../../../node_modules/@swimlane/ngx-datatable/release/index.css';
import '../../../node_modules/@swimlane/ngx-datatable/release/themes/material.css';
import '../../../node_modules/@swimlane/ngx-datatable/release/assets/icons.css';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'updateUserDialog.component.html',
  styleUrls: ['./users.component.css']
})

export class UpdateUserDialogComponent {
  currentUser: any;
  userService: UserService;
  constructor(public dialogRef: MdDialogRef<UpdateUserDialogComponent>) {}

  updateUser() {
    this.userService.update(this.currentUser).subscribe(() => this.dialogRef.close());
  }

  deleteUser() {
    this.userService.delete(this.currentUser.id).subscribe(() => this.dialogRef.close());
  }
}

@Component({
  selector: 'app-create-user',
  templateUrl: 'createUserDialog.component.html',
  styleUrls: ['./users.component.css']
})

export class CreateUserDialogComponent {
  newUser: any = {};
  userService: UserService;
  constructor(public dialogRef: MdDialogRef<CreateUserDialogComponent>) {}

  createUser() {
    this.userService.create(this.newUser).subscribe(() => this.dialogRef.close());
  }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})

export class UsersComponent implements OnInit {
  columns: any[] = [
    { name: 'Id' },
    { name: 'Username' },
    { name: 'First name' },
    { name: 'Last name' },
    { name: 'Country'},
    { name: 'Birthdate'},
    ];
  selectedColumn: string = this.columns[1].name;
  users: User[] = [];
  temp: User[] = [];
  selected: User[] = [];
  constructor(private userService: UserService, public dialog: MdDialog) {

  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(res => {
      this.temp = [...res.users];
      this.users = res.users;
    });
  }

  updateFilter(columnName, event) {
    const columnNameLower = columnName.toLowerCase();
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(d => {
      if (columnName === 'Name' || columnName === 'Description')
        return d[columnNameLower].toLowerCase().indexOf(val) !== -1 || !val;
      if (columnName === 'Id' || columnName === 'Popularity')
        return d[columnNameLower] == val || !val;
      if (columnName === 'Genres')
        return d[columnNameLower].join(',').indexOf(val) !== -1 || !val;
    });
    this.users = temp;
  }

  onSelect({ selected }) {
    let dialogRef:MdDialogRef<UpdateUserDialogComponent> = this.dialog.open(UpdateUserDialogComponent);
    dialogRef.componentInstance.currentUser = this.selected[0];
    dialogRef.componentInstance.userService = this.userService;
    dialogRef.afterClosed().subscribe(() => this.loadAllUsers());
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  createUser(event) {
    let dialogRef:MdDialogRef<CreateUserDialogComponent> = this.dialog.open(CreateUserDialogComponent);
    dialogRef.componentInstance.userService = this.userService;
    dialogRef.afterClosed().subscribe(() => this.loadAllUsers());
  }
}
