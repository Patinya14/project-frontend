import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../service/personal.service';
import { ActivatedRoute } from '@angular/router';
import { DatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
    selector: 'app-personal-list',
    templateUrl: './personal-list.component.html',
})

export class PersonalListComponent implements OnInit {
    public rows = {};
    public id;
    constructor(
        private personalservice: PersonalService,
        private activatedroute: ActivatedRoute,
        private datepickerconfig: DatepickerConfig,
    ) {
        this.id = this.activatedroute.snapshot.params['personalId'];
    }
    ngOnInit() {
        this.personalservice.getPersonById(this.id).subscribe(result => {
            this.rows = result;
        })
    }
}