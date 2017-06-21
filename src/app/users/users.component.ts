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
  selectedImageName: string = 'No file chosen';
  userService: UserService;
  constructor(public dialogRef: MdDialogRef<CreateUserDialogComponent>) {}

  imageUpload(event) {
    const fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        const file: File = fileList[0];
        this.selectedImageName = file.name;
        console.log(`You chose ${this.selectedImageName}`);
        this.newUser = {...this.newUser, avatar: file};
    }
  }

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
    { name: 'Id'},
    { name: 'Username' },
    { name: 'First name' },
    { name: 'Last name' },
    { name: 'Country' },
    { name: 'Birthdate'},
    { name: 'Email' },
  ];
  userFieldsMap: any = {
    'Id': 'id',
    'Username': 'userName',
    'First name': 'firstName',
    'Last name': 'lastName',
    'Country': 'country',
    'Birthdate': 'birthdate',
    'Email': 'email',
  };
  selectedColumn: string = this.columns[1].name;
  users: User[] = [];
  temp: User[] = [];
  selected: User[] = [];
  constructor(private userService: UserService, public dialog: MdDialog) {}

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
    const columnNameLower = this.userFieldsMap[columnName];
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(d => {
      if (['Username', 'First name', 'Last name', 'Country', 'Birthdate', 'Email'].includes(columnName))
        return d[columnNameLower].toLowerCase().indexOf(val) !== -1 || !val;
      return d[columnNameLower] == val || !val;
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
