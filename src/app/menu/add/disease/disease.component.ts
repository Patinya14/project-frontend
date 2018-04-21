import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl  } from '@angular/forms';


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html'
  //styleUrls: ['./disease.component.css']
})
export class DiseaseComponent {
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
