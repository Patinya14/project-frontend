import { Component, OnInit, TemplateRef } from '@angular/core';
import { PersonalListModalComponent } from './personal-list.modal.component';
import { GeneralService } from '../service/general.service';
import { DatepickerConfig } from 'ngx-bootstrap/datepicker';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
    selector: 'app-personal-list',
    templateUrl: './personal-list.component.html',
})

export class PersonalListComponent implements OnInit {
    public rows = {};
    constructor(
        private generalservice: GeneralService,
        private datepickerconfig: DatepickerConfig,        
        private bsmodalservice: BsModalService,
        private modalRef: BsModalRef
    ) { }
    ngOnInit() {
        this.generalservice.getGen().subscribe(result => {
            this.rows = result;
            console.log(this.rows)
        });
    }
    openModal() {
        this.modalRef = this.bsmodalservice.show(PersonalListModalComponent);
    }
}