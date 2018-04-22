import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SummaryService } from '../../service/summary.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActivatedRoute } from '@angular/router'
@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
})
export class SummaryComponent implements OnInit {
    public rows = [];
    public form: FormGroup;
    public id;
    edit = {}
    public data = {
        summaryDiseaseName: [null, Validators.required],
        summarySymptom: [null, Validators.required],
    }


    constructor(

        private summaryservice: SummaryService,
        private bsmodalservice: BsModalService,
        private modalRef: BsModalRef,
        private formBuilder: FormBuilder,
        private activatedroute: ActivatedRoute
    ) {
        this.id = this.activatedroute.snapshot.params['personalId'];
     }
    ngOnInit() {
        this.form = this.formBuilder.group(this.data);
        this.summaryservice.getSummary().subscribe(result => {
            this.rows = result;
        });
    }
    openModal(modal: TemplateRef<any>) {
        this.form = this.formBuilder.group(this.data);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
    }
    submit() {
        const value = this.form.value;
        if (value !== undefined) {
            if (this.form.value.status === 'edit') {
                this.summaryservice.updateSummary(value.id, value)
                    .mergeMap(() => this.summaryservice.getSummary())
                    .subscribe(result => {
                        this.rows = result;
                    })
            } else {
                this.summaryservice.addSummary(value)
                    .mergeMap(() => this.summaryservice.getSummary())
                    .subscribe(result => {
                        this.rows = result;
                    })
            }
        }
    }
    delete(data) {
        if (data !== undefined) {
            this.summaryservice.deleteSummary(data._id)
                .mergeMap(() => this.summaryservice.getSummary())
                .subscribe(result => {
                    this.rows = result;
                })
        }

    }
    openEdit(modal, data) {
        let edit = {
            summaryDiseaseName: data.summaryDiseaseName,
            summarySymptom: data.summarySymptom,
            status: 'edit'
        }
        this.form = this.formBuilder.group(edit);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
    }
}