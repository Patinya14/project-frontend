import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TreatmentService } from '../../service/treatment.service';
import { MedicineService} from '../../service/drug.service';
import { TabsetComponent , AccordionModule} from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
})

export class AddComponent implements OnInit {
    public rows = {};
    public rows2 ={};
    public id;
    @ViewChild('staticTabs') staticTabs: TabsetComponent;
    constructor(
        private treatmentservice: TreatmentService,
        private medicineService: MedicineService,
        private activatedroute: ActivatedRoute,
     ) {
        this.id = this.activatedroute.snapshot.params['personId'];
    }
    ngOnInit() {
        this.treatmentservice.getTreatById(this.id).subscribe(result => {
            this.rows = result;
        })
        this.medicineService.getDrugById(this.id).subscribe(result => {
            this.rows = result;
        })
    }

}