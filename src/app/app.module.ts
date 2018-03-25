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
import { CertificateComponent } from './certificate/certificate.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PrintappointmentsComponent } from './printappoint/printappointments.component';

import { PersonalListComponent } from './personal-list/personal-list.component';
// import { p } from './personal/personal.modal.component'

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
    PersonalListComponent,
    CertificateComponent,
    MenuComponent,
    AppointmentsComponent,
    PrintappointmentsComponent,
    // RecordformComponent,
    
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
