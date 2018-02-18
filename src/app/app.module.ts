import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PersonalComponent } from './add/personal/personal.component';
// import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PersonalComponent,
    // LoginComponent
   
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
