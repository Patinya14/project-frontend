import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
    selector: 'app-drug',
    templateUrl: './drug.component.html'
    //styleUrls: ['./drug.component.css']
})
export class DrugComponent {
    public rows = [];
    public form: FormGroup;
    edit = {}
    public data = {

    }
    constructor(
        private bsmodalservice: BsModalService,
        private modalRef: BsModalRef,
        private formBuilder: FormBuilder,
    ) { }
    ngOnInit() {
        this.form = this.formBuilder.group(this.data);

    }
}


