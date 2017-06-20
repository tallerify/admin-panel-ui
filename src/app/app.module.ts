import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, AdminService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ArtistsComponent, UpdateArtistDialogComponent, CreateArtistDialogComponent } from './artists/artists.component';
import { DatatableComponent } from './datatable/datatable.component';

@NgModule({
    imports: [
        BrowserModule,
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        NgxDatatableModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ArtistsComponent,
        UpdateArtistDialogComponent,
        CreateArtistDialogComponent,
        DatatableComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        AdminService
    ],
    entryComponents: [ArtistsComponent, UpdateArtistDialogComponent, CreateArtistDialogComponent],
    bootstrap: [AppComponent]
})

export class AppModule { }
