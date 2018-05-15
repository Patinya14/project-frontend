import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl  } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TreatmentService} from '../../../service/treatment.service';
@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
 
})
export class DiseaseComponent {
  public rows = [];
  public form: FormGroup;
  edit = {}
  public data = {
    treatDiseaseName:  [null, Validators.required],
    treatDiseaseID:   [null, Validators.required],
    treatMent:   [null, Validators.required], //วิธีการรักษา
    treatProcedure:   [null, Validators.required],  //หัตถการ
    treatPrice: [null, Validators.required],
    treatBodyParth: [null, Validators.required],
  }
  constructor(
    private bsmodalservice: BsModalService,
    private modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private treatmentService: TreatmentService,
) { }
ngOnInit() {
  this.form = this.formBuilder.group(this.data);
  this.treatmentService.getTreat().subscribe(result => {
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
          this.treatmentService.updateTreat(value.id, value)
              .mergeMap(() => this.treatmentService.getTreat())
              .subscribe(result => {
                  this.rows.unshift = result;
              })
      } else {
          this.treatmentService.addTreat(value)
              .mergeMap(() => this.treatmentService.getTreat())
              .subscribe(result => {
                  this.rows = result;
              })
      }
  }
}
delete(data) {
  if (data !== undefined) {
      this.treatmentService.deleteTreat(data._id)
          .mergeMap(() => this.treatmentService.getTreat())
          .subscribe(result => {
              this.rows = result;
          })
  }
}
openEdit(modal, data) {
  let edit = {
      id: data._id,
      treatDiseaseName:data.treatDiseaseName, //ชื่อโรค
      treatDiseaseID: data.treatDiseaseID, //รหัสโรค
      treatMent:data.treatMent, //วิธีการรักษา
      treatProcedure: data.treatProcedure,  //หัตถการ
      treatPrice: data.treatPrice, //ราคาการรักษา
      treatBodyParth: data.treatBodyParth, //ส่วนของร่างกาย
      status: 'edit'
  }
  this.form = this.formBuilder.group(edit);
  this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
}

}