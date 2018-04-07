import { NgModule, } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    NgxDatatableModule,
    TabsModule.forRoot()
  ],
  declarations: [
  ],
  exports: [
    BsDatepickerModule,
    DatepickerModule,
    ModalModule,
    NgxDatatableModule,
    TabsModule
  ]
})
export class ThemeModule { }
