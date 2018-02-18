import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PersonalComponent } from './personal/personal.component';

import { JwtService } from './service/jwt.service';
import { ApiService } from './service/api.service';
import { PersonalService } from './service/personal.service';
import { APP_BASE_HREF } from '@angular/common';
const appRoutes: Routes = [
  { path: 'personal', component: PersonalComponent }
];

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
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    ApiService,
    JwtService,
    PersonalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
