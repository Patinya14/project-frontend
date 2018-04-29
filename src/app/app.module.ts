import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { routing } from './app.routing';
import { ThemeModule } from './theme.module';
import { MenuComponent } from './menu/menu.component';
import { TreaterComponent } from './menu/add/treater/treater.component';
import { DiseaseComponent } from'./menu/add/disease/disease.component';
import { DrugComponent } from './menu/add/drug/drug.component';
import { AddComponent } from './menu/add/add.component';
import {TabTreaterComponent } from './menu/add/tabtreater.component';
import { PersonalComponent } from './personal/personal.component';


import { CertificateComponent } from './certificate/certificate.component';
import { followComponent } from './follow/follow.component';
import { PrintappointmentsComponent } from './printappoint/printappointments.component';
import { RecordformComponent } from './Recordform/Recordform.component';
import { PersonalListComponent } from './personal-list/personal-list.component';
import { GeneralComponent } from './personal-list/general/general.component';
import { PhysicalComponent } from './personal-list/physical/physical.component';
import { SummaryComponent } from './personal-list/summary/summary.component';
import { EvalutionComponent } from './personal-list/evalution/evalution.component';


import { JwtService } from './service/jwt.service';
import { ApiService } from './service/api.service';
import { CertificateService} from './service/certificate.service';
import { PersonalService } from './service/personal.service';
import { GeneralService } from './service/general.service';
import { EvalutionService} from './service/evalution.service';
import { PhysicalService} from './service/physical.service';
import { LoginService } from './service/login.service';
import { SummaryService } from './service/summary.service';
import { FollowService} from './service/follow.service';
import { TreatmentService } from './service/treatment.service';
import { MedicineService} from './service/drug.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { from } from 'rxjs/observable/from';
import { CommonModule } from '@angular/common/src/common_module';
import { TimepickerModule } from 'ngx-bootstrap/timepicker/timepicker.module';


@NgModule({
  imports: [
    routing,
    FormsModule,
    HttpModule,
    BrowserModule,
    HttpClientModule,
    ThemeModule,
    ReactiveFormsModule,
    TimepickerModule.forRoot(),
  
    
   
  ],
  declarations: [
    AppComponent,
    PersonalComponent,
    PersonalListComponent,
    CertificateComponent,
    MenuComponent,
    TreaterComponent ,
    DiseaseComponent,
    PrintappointmentsComponent,
    GeneralComponent,
    PhysicalComponent,
    SummaryComponent,
    EvalutionComponent,
    AddComponent,
    DrugComponent,
    followComponent,
    TabTreaterComponent ,
    


  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    ApiService,
    JwtService,
    PersonalService,
    GeneralService,
    PhysicalService,
    LoginService,
    SummaryService,
    BsModalService,
    BsModalRef,
    EvalutionService,
    FollowService,
    TreatmentService,
    MedicineService,
    CertificateService,

  ],
  bootstrap: [AppComponent]
  

})
export class AppModule { }
