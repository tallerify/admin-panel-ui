﻿import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AdminService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private adminService: AdminService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.adminService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(JSON.parse(error._body).message);
                    this.loading = false;
                });
    }
}
