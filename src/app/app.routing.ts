import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PersonalComponent } from './personal/personal.component';
import { CertificateComponent } from './certificate/certificate.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PrintappointmentsComponent } from './printappoint/printappointments.component';
import { PersonalListComponent } from './personal-list/personal-list.component';


export const routes: Routes = [
    { path: 'personal', component: PersonalComponent  },
    { path: 'certificate', component: CertificateComponent },
    { path: 'appointments', component: AppointmentsComponent },
    { path: 'printappoint', component: PrintappointmentsComponent },
    { path: 'personal-list', component: PersonalListComponent },

    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes)