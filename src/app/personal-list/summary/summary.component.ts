import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SummaryService } from '../../service/summary.service'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActivatedRoute } from '@angular/router'
@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
})
export class SummaryComponent implements OnInit {
    public id;
    public rows = [];
    public form: FormGroup;
    edit = {}
    public data = {

        summarySymptom: [null, Validators.required], //อาการ
        summaryProcedure: [null, Validators.required], //หัตถการ
        summaryTreatment: [null, Validators.required], //แผนการรักษา
        summaryHerbalcompress: [null, Validators.required], //ประคบสมุนไพร
        summaryHerbalsteam: [null, Validators.required], //อบสมุนไพร
        summaryDrug: [null, Validators.required], //จ่ายยา
        summaryAnother: [null, Validators.required], //อื่นๆ
    }
    constructor(
        private summaryService: SummaryService,
        private bsmodalservice: BsModalService,
        private modalRef: BsModalRef,
        private formBuilder: FormBuilder,
        private activatedroute: ActivatedRoute
    ) {
        this.id = this.activatedroute.snapshot.params['personalId'];
    }
    ngOnInit() {
        this.form = this.formBuilder.group(this.data);

        this.summaryService.getSummaryById(this.id).subscribe(result => {
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
        value.personId = this.id;
        const temp: any = this.herbCheck(value);
        if (temp !== undefined) {
            if (this.form.value.status === 'edit') {
                this.summaryService.updateSummary(temp.id, temp)
                    .mergeMap(() => this.summaryService.getSummary())
                    .subscribe(result => {
                        this.rows = result;
                    })
            } else {
                this.summaryService.addSummary(temp)
                    .mergeMap(() => this.summaryService.getSummaryById(this.id))
                    .subscribe(result => {
                        this.rows = result;
                    })
            }
        }
    }
    herbCheck(data) {
        if (data.summaryHerbalsteam === true) {
            data.summaryHerbalsteam = 'ประคบสมุนไพร';
        } 
        if (data.summaryHerbalcompress === true) {
            data.summaryHerbalcompress = 'อบสมุนไพร';
        }
        if (data.summaryHerbalsteam === false) {
            data.summaryHerbalsteam = '';
        }
        if (data.summaryHerbalcompress === false) {
            data.summaryHerbalcompress = '';
        }
        if (data.summaryDrug === true){
            data.summaryDrug = 'จ่ายยาจากสมุนไพร'
        }
        if (data.summaryDrug === false) {
            data.summaryDrug = '';
        }
        return data;
    }
    delete(data) {
        if (data !== undefined) {
            this.summaryService.deleteSummary(data._id)
                .mergeMap(() => this.summaryService.getSummaryById(this.id))
                .subscribe(result => {
                    this.rows = result;
                })
        }
    }
    openEdit(modal, data) {
        let edit = {
            id: data._id,
            summarySymptom: data.summarySymptom,
            summaryProcedure: data.summaryProcedure,
            summaryTreatment: data.summaryTreatment,
            summaryHerbalcompress: data.summaryHerbalcompress, //ประคบสมุนไพร
            summaryHerbalsteam: data.summaryHerbalsteam, //อบสมุนไพร
            summaryDrug: data.summaryDrug, //จ่ายยา
            summaryAnother: data.summaryAnother, //อื่นๆ
            status: 'edit'
        }
        this.form = this.formBuilder.group(edit);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));

    }



}


