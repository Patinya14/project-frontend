import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DiseaseService } from '../../../service/disease.service';
@Component({
    selector: 'app-disease',
    templateUrl: './disease.component.html',

})
export class DiseaseComponent {
    public rows = [];
    public form: FormGroup;
    edit = {}
    p: number = 1;
    public data = {
        disName: [null, Validators.required],
        disID: [null, Validators.required],
        disProcedure: [null, Validators.required],  //หัตถการ      
        disBodyParth: [null, Validators.required],
    }
    constructor(
        private bsmodalservice: BsModalService,
        private modalRef: BsModalRef,
        private formBuilder: FormBuilder,
        private diseaseservice: DiseaseService,
    ) { }
    ngOnInit() {
        this.form = this.formBuilder.group(this.data);
        this.diseaseservice.getDis().subscribe(result => {
            this.rows = result;
        });
    }
    openModal(modal: TemplateRef<any>) {
        this.form = this.formBuilder.group(this.data);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
    }
    openModalView(modal: TemplateRef<any>, data) {
        this.form = this.formBuilder.group(data);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
    }
    submit() {
        const value = this.form.value;
        if (value !== undefined) {
            if (this.form.value.status === 'edit') {
                this.diseaseservice.updateDis(value.id, value)
                    .mergeMap(() => this.diseaseservice.getDis())
                    .subscribe(result => {
                        this.rows.unshift = result;
                    })
            } else {
                this.diseaseservice.addDis(value)
                    .mergeMap(() => this.diseaseservice.getDis())
                    .subscribe(result => {
                        this.rows = result;
                    })
            }
        }
    }
    delete(data) {
        if (data !== undefined) {
            this.diseaseservice.deleteDis(data._id)
                .mergeMap(() => this.diseaseservice.getDis())
                .subscribe(result => {
                    this.rows = result;
                })
        }
    }
    openEdit(modal, data) {
        let edit = {
            id: data._id,
            disName: data.treatDiseaseName, //ชื่อโรค
            disID: data.treatDiseaseID, //รหัสโรค   
            disProcedure: data.treatProcedure,  //หัตถการ         
            disBodyParth: data.treatBodyParth, //ส่วนของร่างกาย
            status: 'edit'
        }
        this.form = this.formBuilder.group(edit);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
    }

}