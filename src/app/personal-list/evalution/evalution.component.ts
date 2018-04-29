
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvalutionService } from '../../service/evalution.service'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActivatedRoute } from '@angular/router'
@Component({
    selector: 'app-evalution',
    templateUrl: './evalution.component.html',
})
export class EvalutionComponent implements OnInit {
    public id;
    public rows = [];
    public body = '';
    public form: FormGroup;
    public images = [
        {
            name: 'ศรีษะ',
            img: '../assets/images/ศีรษะ.jpg'
        },
        {
            name: 'ไหล่',
            img: '../assets/images/bed.png'
        },
        {
            name: 'สะโพก',
            img: '../assets/images/home.png'
        },

    ]
    edit = {}
    public data = {
        // personId : [null, Validators.required],
        evaAfter: [null, Validators.required]
    }
    constructor(
        private evalutionservice: EvalutionService,
        private bsmodalservice: BsModalService,
        private modalRef: BsModalRef,
        private formBuilder: FormBuilder,
        private activatedroute: ActivatedRoute
    ) {
        this.id = this.activatedroute.snapshot.params['personalId'];
    }
    ngOnInit() {
        this.form = this.formBuilder.group(this.data);

        this.evalutionservice.getEvaById(this.id).subscribe(result => {
            this.rows = result;
        });
    }
    openModal(modal: TemplateRef<any>) {
        this.form = this.formBuilder.group(this.data);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
    }
    // clickBody() {
    //     this.body = this.form.value.
    // }
    changeimages() {
        this.images.forEach(element => {
            if (element.name === this.body)
                return element.img
        });
    } submit() {
        const value = this.form.value;
       
        if (value !== undefined) {
            if (this.form.value.status === 'edit') {
                this.evalutionservice.updateEva(value.id, value)
                    .mergeMap(() => this.evalutionservice.getEva())
                    .subscribe(result => {
                        this.rows = result;
                    })
            } else {
                this.evalutionservice.addEva(value)
                    .mergeMap(() => this.evalutionservice.getEva())
                    .subscribe(result => {
                        this.rows = result;
                    })
            }
        }
    }
    delete(data) {
        if (data !== undefined) {
            this.evalutionservice.deleteEva(data._id)
                .mergeMap(() => this.evalutionservice.getEva())
                .subscribe(result => {
                    this.rows = result;
                })
        }
    }
    openEdit(modal, data) {
        let edit = {
            id: data._id,
            EvaDate: data.EvaDate,
            evaAfter: data.evaAfter,

            status: 'edit'
        }
        this.form = this.formBuilder.group(edit);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));

    }



}