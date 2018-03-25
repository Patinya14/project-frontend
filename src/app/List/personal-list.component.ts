import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../service/personal.service';
import { ActivatedRoute } from '@angular/router';
import { DatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { templateJitUrl, TemplateBinding } from '@angular/compiler';
import { TemplateRef } from '@angular/core';

@Component({
    selector: 'app-personal-list',
    templateUrl: './personal-list.component.html',
})

export class PersonalListComponent implements OnInit {
    public rows = {};
    public id;
    public modalRef: BsModalRef;
    constructor(
        private personalservice: PersonalService,
        private activatedroute: ActivatedRoute,
        private datepickerconfig: DatepickerConfig,
        private modalService: BsModalService,

    ) {
        this.id = this.activatedroute.snapshot.params['personalId'];

    }
    openModalWithClass(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template,
            Object.assign({}, { class: 'gray modal-lg' })
        );
    }
    ngOnInit() {
        this.personalservice.getPersonById(this.id).subscribe(result => {
            this.rows = result;
        })
    }








}