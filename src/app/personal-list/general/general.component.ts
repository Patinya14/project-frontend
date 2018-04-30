import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../service/general.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ActivatedRoute } from '@angular/router'
@Component({
    selector: 'app-general',
    templateUrl: './general.component.html',
})
export class GeneralComponent implements OnInit {
    public rows = [];
    public form: FormGroup;
    public id;
    
    edit = {}
    public data = {
        // personId : [null, Validators.required],
        genDate:  [new Date('yyyy-mm-dd'), Validators.required],
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
        private activatedroute: ActivatedRoute,
        
    ) { 
        this.id = this.activatedroute.snapshot.params['personalId'];
    }
    ngOnInit() {
        this.form = this.formBuilder.group(this.data);
        this.generalservice.getGenById(this.id).subscribe(result => {
            this.rows = result;
        });
    }
    openModal(modal: TemplateRef<any>) {
        this.form = this.formBuilder.group(this.data);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
    }
    submit() {
        const value = this.form.value;
        value.personId = this.id;
       
        if (value !== undefined) {
            if (this.form.value.status === 'edit') {
                this.generalservice.updateGen(value.id, value)
                    .mergeMap(() => this.generalservice.getGenById(this.id))
                    .subscribe(result => {
                        this.rows = result;
                    })
            } else {
                this.generalservice.addGen(value)
                    .mergeMap(() => this.generalservice.getGenById(this.id))
                    .subscribe(result => {
                        this.rows = result;
                    })
            }
        }
    }
    delete(data) {
        if (data !== undefined) {
            this.generalservice.deleteGen(data._id)
                .mergeMap(() => this.generalservice.getGenById(this.id))
                .subscribe(result => {
                    this.rows = result;
                })
        }
    }
    openEdit(modal, data) {
        let edit = {
            id: data._id,
            genDate: data.genDate,
            genTime: data.genTime,
            genSymptoms: data.genSymptoms,
            genPresentHistory: data.genPresentHistory,
            genPastHistory: data.genPastHistory,
            status: 'edit'
        }
        this.form = this.formBuilder.group(edit);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
    }
}