import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
<<<<<<< HEAD
import { PersonalComponent } from './add/personal/personal.component';
// import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
=======
import { PersonalComponent } from './personal/personal.component';
import { LoginComponent } from './login/login.component';
import { OldusersComponent } from './oldusers/oldusers.component';

import { JwtService } from './service/jwt.service';
import { ApiService } from './service/api.service';
import { PersonalService } from './service/personal.service';

import { APP_BASE_HREF } from '@angular/common';


const appRoutes: Routes = [
  { path: 'personal', component: PersonalComponent },
  { path: 'login',    component: LoginComponent },
  { path: 'oldusers', component: OldusersComponent },
];
>>>>>>> 2973a829a74141fb1b8a0ac14b95601afef0dada

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FormsModule,
    HttpModule,
    BrowserModule,
    HttpClientModule
  
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    PersonalComponent,
<<<<<<< HEAD
    LoginComponent,
    OldusersComponent
=======
<<<<<<< HEAD
    // LoginComponent
   
=======
>>>>>>> 2973a829a74141fb1b8a0ac14b95601afef0dada
>>>>>>> f25e69a57972f9d4fa93998f81b2f0614c9a733f
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    ApiService,
    JwtService,
    PersonalService,
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
