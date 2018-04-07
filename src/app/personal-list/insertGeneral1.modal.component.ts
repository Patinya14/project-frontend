import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../service/general.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-insertGeneral1',
    templateUrl: './insertGeneral1.modal.component.html',
})
export class InsertGeneral1Component implements OnInit {
    public rows = {};
    public form: FormGroup;
    public data = {
        // personId : [null, Validators.required],
        genDate: [null, Validators.required],
        genTime: [null, Validators.required],
        genSymptoms: [null, Validators.required],
        genPresentHistory: [null, Validators.required],
        genPastHistory: [null, Validators.required],
      }
    constructor(
        private generalservice: GeneralService,       
        private bsmodalservice: BsModalService,
        private modalRef: BsModalRef,
        private formBuilder: FormBuilder,
    ) { }
    ngOnInit() {
        this.form = this.formBuilder.group(this.data);
        this.generalservice.getGen().subscribe(result => {
            this.rows = result;
        });
    }
    openModal(modal: TemplateRef<any>) {
        const modalRef = this.bsmodalservice.show(modal,Object.assign({}, { class: 'gray modal-lg' }));
    }
    submit() {
        const value = this.form.value;
        if (value !== undefined) {
            this.generalservice.addGen(value)
            .mergeMap(() => this.generalservice.getGen())
            .subscribe(result => {
                this.rows = result;
                this.modalRef.hide();
            })
        }
    }
    delete(data) {
        if (data !== undefined) {
            this.generalservice.deleteGen(data._id)
            .mergeMap(() => this.generalservice.getGen())
            .subscribe(result => {
                this.rows = result;
            })
        }

    }
}