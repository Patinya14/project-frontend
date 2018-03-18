import { NgModule } from '@angular/core';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  declarations: [

  ],
  exports: [
    BsDatepickerModule,
    DatepickerModule
  ]

})
export class ThemeModule { }
