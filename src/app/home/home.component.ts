import {Component, Inject, OnInit} from '@angular/core';
import { AppComponent } from '../app.component';
import { Admin } from '../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentAdmin: Admin;

    constructor(@Inject(AppComponent) private parent: AppComponent) {
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin')).admin;
        parent.admin = this.currentAdmin;
    }

    ngOnInit() {
    }

}