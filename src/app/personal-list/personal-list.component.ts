import { Component, OnInit, TemplateRef } from '@angular/core';
import { PersonalService } from '../service/personal.service';
import { ActivatedRoute } from '@angular/router';
import { DatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TabsModule } from 'ngx-bootstrap';
import { TabsetComponent } from 'ngx-bootstrap';
@Component({
    selector: 'app-personal-list',
    templateUrl: './personal-list.component.html',
})

export class PersonalListComponent implements OnInit { 
  
    public rows = {};
    public id;
    modalRef: BsModalRef;
    staticTabs: TabsetComponent;
    constructor(
        private personalservice: PersonalService,
        private activatedroute: ActivatedRoute,
        private datepickerconfig: DatepickerConfig,
        private modalService: BsModalService
    ) {
        this.id = this.activatedroute.snapshot.params['personalId'];
    }
    ngOnInit() {
        this.personalservice.getPersonById(this.id).subscribe(result => {
            this.rows = result;
        });
    }
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
      }
       selectTab(tab_id: number) {
         this.staticTabs.tabs[tab_id].active = true;
       }
}