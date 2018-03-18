import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { PersonalComponent } from './personal/personal.component';
import { LoginComponent } from './login/login.component';
import { OldusersComponent } from './oldusers/oldusers.component';
import { CertificateComponent } from './certificate/certificate.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PrintappointmentsComponent } from './printappoint/printappointments.component';
import { PersonalListComponent } from './List/personal-list.component'

import { JwtService } from './service/jwt.service';
import { ApiService } from './service/api.service';
import { PersonalService } from './service/personal.service';
import { LoginService } from './service/login.service';


import { APP_BASE_HREF } from '@angular/common';


const appRoutes: Routes = [
  { path: 'personal', component: PersonalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'oldusers', component: OldusersComponent },
  { path: 'certificate', component: CertificateComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'printappoint', component: PrintappointmentsComponent },
  { path: 'personal-list/:personalId', component: PersonalListComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FormsModule,
    HttpModule,
    BrowserModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot()

  ],
  declarations: [
    AppComponent,
    MenuComponent,
    PersonalComponent,

    LoginComponent,
    OldusersComponent,
    CertificateComponent,
    AppointmentsComponent,
    PrintappointmentsComponent,
    PersonalListComponent
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    ApiService,
    JwtService,
    PersonalService,
    LoginService
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }
