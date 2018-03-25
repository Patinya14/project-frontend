import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { APP_BASE_HREF } from '@angular/common';
import { routing } from './app.routing';
import { ThemeModule } from './theme.module';

import { PersonalComponent } from './personal/personal.component';
import { LoginComponent } from './login/login.component';
import { OldusersComponent } from './oldusers/oldusers.component';
import { CertificateComponent } from './certificate/certificate.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PrintappointmentsComponent } from './printappoint/printappointments.component';
import { PersonalListComponent } from './List/personal-list.component';

import { JwtService } from './service/jwt.service';
import { ApiService } from './service/api.service';
import { PersonalService } from './service/personal.service';
import { LoginService } from './service/login.service';

@NgModule({
  imports: [
    routing,
    FormsModule,
    HttpModule,
    BrowserModule,
    HttpClientModule,
    ThemeModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    PersonalComponent,
    LoginComponent,
    OldusersComponent,
    CertificateComponent,
    MenuComponent,
    AppointmentsComponent,
    PrintappointmentsComponent,
    PersonalListComponent
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    ApiService,
    JwtService,
    PersonalService,
    LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
