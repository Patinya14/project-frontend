import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FollowService } from '../service/follow.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

// import { Script } from 'vm';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
})
export class followComponent implements OnInit {
  public id;
  public rows = [];
  public form: FormGroup;
  edit = {}
  public time = ['06.00', '06.30', '07.00', '07.30', '08.00', '08.30', '09.00', '09.30', '10.00', '10.30', '11.00',
    '11.30', '12.00', '12.30', '13.00', '13.30', '14.00', '14.30', '15.00', '15.30', '16.00', '16.30',
    '17.00', '17.30', '18.00', '18.30', '19.00', '19.30', '20.00', '20.30', '21.00', '21.30', '22.00',
    '22.30', '23.00', '23.30', '24.00'];
  public data = {
    folName: [null, Validators.required],
    folSurName: [null, Validators.required],
    folDate: [new Date('yyyy-mm-dd'), Validators.required],
    folmytimeHour: [null, Validators.required],
    folmytimeMinute: [null, Validators.required],
    folPhysicianName: [null, Validators.required], //ผู้รักษา
    folPurpose: [null, Validators.required], //จุดประสงค์
    folduration: [null, Validators.required], //ช่วงเวลาการรักษา
  }
  constructor(
    private followservice: FollowService,
    private bsmodalservice: BsModalService,
    private modalRef: BsModalRef,
    private formBuilder: FormBuilder,
  ) {

  }
  ngOnInit() {
    this.form = this.formBuilder.group(this.data);

    this.followservice.getFollow().subscribe(result => {
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
        this.followservice.updateFollow(value.id, value)
          .mergeMap(() => this.followservice.getFollow())
          .subscribe(result => {
            this.rows = result;
          })
      } else {
        this.followservice.addFollow(value)
          .mergeMap(() => this.followservice.getFollow())
          .subscribe(result => {
            this.rows = result;
          })
      }
    }
  }
  delete(data) {
    if (data !== undefined) {
      this.followservice.deleteFollow(data._id)
        .mergeMap(() => this.followservice.getFollow())
        .subscribe(result => {
          this.rows = result;
        })
    }
  }
  openEdit(modal, data) {
    let edit = {
      id: data._id,
      folName: data.folName,
      folSurName: data.folSurName,
      folDate: data.folDate,
      folmytimeHour: data.folmytimeHour,
      folmytimeMinute: data.folmytimeMinute,
      folPhysicianName: data.folPhysicianName,
      folPurpose: data.folPurpose,
      folduration: data.folduration,
      status: 'edit'
    }
    this.form = this.formBuilder.group(edit);
    this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
  }

}
// export class followComponent {
//   public rows = [];
//   public form: FormGroup;

//   edit = {}
//   public data = {

//     folName: [null, Validators.required],
//     folSurName: [null, Validators.required],
//     folDate: [new Date('yyyy-mm-dd'), Validators.required],
//     folmytimeHour: [null, Validators.required],
//     folPhysicianName: [null, Validators.required], //ผู้รักษา
//     folPurpose: [null, Validators.required], //จุดประสงค์
//     folduration: [null, Validators.required], //ช่วงเวลาการรักษา


//   }
//   constructor(
//     private followservice: FollowService,
//     private bsmodalservice: BsModalService,
//     private modalRef: BsModalRef,
//     private formBuilder: FormBuilder,

//   ) { 

//   }
//   ngOnInit() {
//     this.form = this.formBuilder.group(this.data);
//     this.followservice.getFollow().subscribe(result => {
//       this.rows = result;
//     });
//   }
//   submit() {
//     const value = this.form.value;
//     if (value !== undefined) {
//       if (this.form.value.status === 'edit') {
//         this.followservice.updateFollow(value.id, value)
//           .mergeMap(() => this.followservice.getFollow())
//           .subscribe(result => {
//             this.rows = result;
//           })
//       } else {
//         this.followservice.addFollow(value)
//           .mergeMap(() => this.followservice.getFollow())
//           .subscribe(result => {
//             this.rows = result;
//           })
//       }
//     }
//   }

//   delete(data) {
//     if (data !== undefined) {
//       this.followservice.deleteFollow(data._id)
//         .mergeMap(() => this.followservice.getFollow())
//         .subscribe(result => {
//           this.rows = result;
//         })
//     }
//   }
//   openModal(modal: TemplateRef<any>) {
//     this.form = this.formBuilder.group(this.data);
//     this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
//   }
//   openEdit(modal, data) {
//     let edit = {
//       id: data._id,
//       folName: data.folName,
//       folSurName: data.folSurName,
//       folDate: [new Date('yyyy-mm-dd'), data.folDate],
//       folmytimeHour: data.folmytimeHour,
//       folPhysicianName: data.folPhysicianName, 
//       folPurpose: data.folPurpose, 
//       folduration: data.folduration, 
//       status: 'edit'

//     }
//     this.form = this.formBuilder.group(edit);
//     this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
//   }
// }




