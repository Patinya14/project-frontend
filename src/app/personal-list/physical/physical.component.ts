import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {PhysicalService} from '../../service/physical.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
    selector: 'app-physical',
    templateUrl: './physical.component.html',
})
export class PhysicalComponent implements OnInit {
    public rows = [];
    public form: FormGroup;
    edit = {}
    public data = {

        phyTemp: [null,Validators.required],
        phyPulse:  [null,Validators.required],
        phyRespirationRate:  [null,Validators.required],
        phyBp:  [null,Validators.required],
        phyHeight:  [null,Validators.required],
        phyWeight: [null,Validators.required],
        
    }
    constructor(
        private physicalsevice: PhysicalService,
        private bsmodalservice: BsModalService,
        private modalRef: BsModalRef,
        private formBuilder: FormBuilder,
    ) { }
    ngOnInit() {
        this.form = this.formBuilder.group(this.data);
        this.physicalsevice.getPhy().subscribe(result => {
            this.rows = result;
        
        });

    } openModal(modal: TemplateRef<any>) {
        this.form = this.formBuilder.group(this.data);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
    }
    submit() {
        const value = this.form.value;
        if (value !== undefined) {
            if (this.form.value.status === 'edit') {
                this.physicalsevice.updatePhy(value.id, value)
                    .mergeMap(() => this.physicalsevice.getPhy())
                    .subscribe(result => {
                        this.rows = result;
                    })
            } else {
                this.physicalsevice.addPhy(value)
                    .mergeMap(() => this.physicalsevice.getPhy())
                    .subscribe(result => {
                        this.rows = result;
                    })
            }
        }
    }
    delete(data) {
        if (data !== undefined) {
            this.physicalsevice.deletePhy(data._id)
                .mergeMap(() => this.physicalsevice.getPhy())
                .subscribe(result => {
                    this.rows = result;
                })
        }
    }
    openEdit(modal, data) {
        let edit = {
            id: data._id,
            phyTemp: data. phyTemp,
            phyPulse: data.phyPulse,
            phyRespirationRate: data.phyRespirationRate,
            phyBp: data. phyBp,
            phyHeight: data.phyHeight,
            phyWeight: data. phyWeight,
            status: 'edit'
            
            
        }
        this.form = this.formBuilder.group(edit);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
    }

}