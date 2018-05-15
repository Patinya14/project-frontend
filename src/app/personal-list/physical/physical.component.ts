import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhysicalService } from '../../service/physical.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActivatedRoute } from '@angular/router'
@Component({
    selector: 'app-physical',
    templateUrl: './physical.component.html',
})
export class PhysicalComponent implements OnInit {
    public rows = [];
    public form: FormGroup;
    public id;
    public body = '';
    edit = {}
    public bodyparth = ['ศีรษะ', 'ต้นคอ', 'บ่า', 'ไหล่ ', 'หลัง-เอว '
        , 'ขา-เท้า', 'ข้อเท้า ', 'เข่า', 'ข้อศอก', 'ข้อมือ/ข้อนิ้ว', 'อ่อนเเรงข้างซ้าย', 'อ่อนแรงข้างขวา', 'อ่อนแรงทั้งสองข้าง'];
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
    public data = {

        phyTemp: [null, Validators.required],
        phyPulse: [null, Validators.required],
        phyRespirationRate: [null, Validators.required],
        phyBp: [null, Validators.required],
        phyHeight: [null, Validators.required],
        phyWeight: [null, Validators.required],
        phyBodyParth: [null, Validators.required],
    }
    constructor(
        private physicalsevice: PhysicalService,
        private bsmodalservice: BsModalService,
        private modalRef: BsModalRef,
        private formBuilder: FormBuilder,
        private activatedroute: ActivatedRoute
    ) {
        this.id = this.activatedroute.snapshot.params['personalId'];
    }
    ngOnInit() {
        this.form = this.formBuilder.group(this.data);
        this.physicalsevice.getPhyById(this.id).subscribe(result => {
            this.rows = result;

        });

    } openModal(modal: TemplateRef<any>) {
        this.form = this.formBuilder.group(this.data);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
    }
    openModalView(modal: TemplateRef<any>, data) {
        this.form = this.formBuilder.group(data);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
      }
    changeimages() {
        this.images.forEach(element => {
            if (element.name === this.body)
                return element.img
        });
    }
    submit() {
        const value = this.form.value;
        value.personId = this.id;
        if (value !== undefined) {
            if (this.form.value.status === 'edit') {
                this.physicalsevice.updatePhy(value.id, value)
                    .mergeMap(() => this.physicalsevice.getPhyById(this.id))
                    .subscribe(result => {
                        this.rows = result;
                    })
            } else {
                this.physicalsevice.addPhy(value)
                    .mergeMap(() => this.physicalsevice.getPhyById(this.id))
                    .subscribe(result => {
                        this.rows = result;
                    })
            }
        }
    }
    delete(data) {
        if (data !== undefined) {
            this.physicalsevice.deletePhy(data._id)
                .mergeMap(() => this.physicalsevice.getPhyById(this.id))
                .subscribe(result => {
                    this.rows = result;
                })
        }
    }
    openEdit(modal, data) {
        let edit = {
            id: data._id,
            phyTemp: data.phyTemp,
            phyPulse: data.phyPulse,
            phyRespirationRate: data.phyRespirationRate,
            phyBp: data.phyBp,
            phyHeight: data.phyHeight,
            phyWeight: data.phyWeight,
            phyBodyParth: data.phyBodyParth,
            status: 'edit'


        }
        this.form = this.formBuilder.group(edit);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
    }

}