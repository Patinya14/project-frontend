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
import { InsertGeneral1Component } from './personal-list/insertGeneral1.modal.component';
import { InsertGeneral2Component } from './personal-list/insertGeneral2.modal.component';
import { InsertGeneral3Component } from './personal-list/insertGeneral3.modal.component';
import { InsertGeneral4Component } from './personal-list/insertGeneral4.modal.component';
import { InsertGeneral5Component } from './personal-list/insertGeneral5.modal.component';
import { InsertGeneral6Component} from './personal-list/insertGeneral6.modal.component'
import { JwtService } from './service/jwt.service';
import { ApiService } from './service/api.service';
import { PersonalService } from './service/personal.service';
import { GeneralService } from './service/general.service';
import { LoginService } from './service/login.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { from } from 'rxjs/observable/from';
@NgModule({
  imports: [
    routing,
    FormsModule,
    HttpModule,
    BrowserModule,
    HttpClientModule,
    ThemeModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    PersonalComponent,
    PersonalListComponent,
    CertificateComponent,
    MenuComponent,
    AppointmentsComponent,
    PrintappointmentsComponent,
    InsertGeneral1Component,
    InsertGeneral2Component,
    InsertGeneral3Component,
    InsertGeneral4Component,
    InsertGeneral5Component,
    InsertGeneral6Component
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    ApiService,
    JwtService,
    PersonalService,
    GeneralService,
    LoginService,
    BsModalService,
    BsModalRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
