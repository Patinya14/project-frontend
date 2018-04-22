import { NgModule, } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'ngx-bootstrap';
import { CalendarModule } from 'angular-calendar';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    NgxDatatableModule,
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    CalendarModule.forRoot()
  ],
  declarations: [
  ],
  exports: [
    BsDatepickerModule,
    DatepickerModule,
    ModalModule,
    NgxDatatableModule,
    TabsModule,
    AccordionModule,
    CalendarModule,
    BrowserAnimationsModule
  ]
})
export class ThemeModule { }
