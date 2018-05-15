import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { MenuComponent} from './menu/menu.component';
import { TreaterComponent} from './menu/add/treater/treater.component';
import { DiseaseComponent} from './menu/add/disease/disease.component';
import { AddComponent} from'./menu/add/add.component';
import {TabTreaterComponent } from './menu/add/tabtreater.component';
import { DrugComponent } from './menu/add/drug/drug.component';
import { PersonalComponent } from './personal/personal.component';
import { CertificateComponent } from './certificate/certificate.component';
import { followComponent } from './follow/follow.component';
import { PrintappointmentsComponent } from './printappoint/printappointments.component';
import { PersonalListComponent } from './personal-list/personal-list.component';






export const routes: Routes = [
    { path: 'menu',component: MenuComponent},
    { path: 'personal', component: PersonalComponent  },
    { path: 'certificate', component: CertificateComponent },
    { path: 'follow', component: followComponent },
    { path: 'printappoint', component: PrintappointmentsComponent },
    { path: 'personal-list/:personalId', component: PersonalListComponent },
    { path: 'treater', component: TreaterComponent },
    { path: 'disease', component: DiseaseComponent },
    { path: 'add', component: AddComponent  },
    { path: 'drug', component: DrugComponent  },
    { path: 'tabtreater', component: TabTreaterComponent },
    
    
    
    

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes)