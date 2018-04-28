import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl  } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MedicineService} from '../../../service/drug.service';
@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html'
  //styleUrls: ['./disease.component.css']
})
export class DrugComponent {
  public rows = [];
  public form: FormGroup;
  edit = {}
  public data = {
    drugId: [null, Validators.required],
    drugName: [null, Validators.required],
    drugAmount: [null, Validators.required],
    drugUseDose: [null, Validators.required],
    drugPrice: [null, Validators.required],
    drugProperties: [null, Validators.required],

  }
  constructor(
    private bsmodalservice: BsModalService,
    private modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private medicineService: MedicineService,
) { }
ngOnInit() {
  this.form = this.formBuilder.group(this.data);
  this.medicineService.getDrug().subscribe(result => {
    this.rows = result;
});
}
openModal(modal: TemplateRef<any>) {
  this.form = this.formBuilder.group(this.data);
  this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
}
submit() {
  const value = this.form.value;
  if (value !== undefined) {
      if (this.form.value.status === 'edit') {
          this.medicineService.updateDrug(value.id, value)
              .mergeMap(() => this.medicineService.getDrug())
              .subscribe(result => {
                  this.rows = result;
              })
      } else {
          this.medicineService.addDrug(value)
              .mergeMap(() => this.medicineService.getDrug())
              .subscribe(result => {
                  this.rows = result;
              })
      }
  }
}
delete(data) {
  if (data !== undefined) {
      this.medicineService.deleteDrug(data._id)
          .mergeMap(() => this.medicineService.getDrug())
          .subscribe(result => {
              this.rows = result;
          })
  }
}
openEdit(modal, data) {
  let edit = {
      id: data._id,
      drugId: data.drugId,
      drugName: data.drugName,
      drugAmount: data.drugAmount,
      drugUseDose: data.drugUseDose,
      drugPrice: data.drugPrice,
      drugProperties: data.drugProperties,
      status: 'edit'
  }
  this.form = this.formBuilder.group(edit);
  this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
}

}