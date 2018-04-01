import { Component, OnInit, TemplateRef } from '@angular/core';
import { PersonalService } from '../service/personal.service';
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
        private personalservice: PersonalService,
        private datepickerconfig: DatepickerConfig,
        private bsmodalservice: BsModalService,
        private modalRef: BsModalRef
    ) { }
    ngOnInit() {
        this.personalservice.getPerson().subscribe(result => {
            this.rows = result;
            console.log(this.rows)
        });
    }
    openModal(modal: TemplateRef<any>) {
        this.modalRef = this.bsmodalservice.show(modal);
    }
}