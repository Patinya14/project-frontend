import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TreatmentService } from '../../../service/treatment.service';
@Component({
    selector: 'app-remedy',
    templateUrl: './remedy.component.html'

})
export class RemedyComponent {
    public rows = [];
    public form: FormGroup;
    edit = {}
    public data = {
        treatMent: [null, Validators.required],
        treatPrice: [null, Validators.required],
    }
    constructor(
        private bsmodalservice: BsModalService,
        private modalRef: BsModalRef,
        private formBuilder: FormBuilder,
        private TreatmentService: TreatmentService,
    ) { }
    ngOnInit() {
        this.form = this.formBuilder.group(this.data);
        this.TreatmentService.getTreat().subscribe(result => {
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
                this.TreatmentService.updateTreat(value.id, value)
                    .mergeMap(() => this.TreatmentService.getTreat())
                    .subscribe(result => {
                        this.rows = result;
                    })
            } else {
                this.TreatmentService.addTreat(value)
                    .mergeMap(() => this.TreatmentService.getTreat())
                    .subscribe(result => {
                        this.rows = result;
                    })
            }
        }
    }
    delete(data) {
        if (data !== undefined) {
            this.TreatmentService.deleteTreat(data._id)
                .mergeMap(() => this.TreatmentService.getTreat())
                .subscribe(result => {
                    this.rows = result;
                })
        }
    }
    openEdit(modal, data) {
        let edit = {
            id: data._id,
            treatMent: data.treatMent,
            treatPrice: data.treatPrice,
            status: 'edit'
        }
        this.form = this.formBuilder.group(edit);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
    }
}
