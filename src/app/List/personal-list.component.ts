import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../service/personal.service';
import { ActivatedRoute } from '@angular/router'
@Component({
    selector: 'app-personal-list',
    templateUrl: './personal-list.component.html',
    // styleUrls: ['./personal-list.component.css']
})

export class PersonalListComponent implements OnInit {
    public rows = [];
    public data = [];
    
    constructor(
        private personalservice: PersonalService,
        private activatedroute: ActivatedRoute
    ) { 
        this.data = this.activatedroute.snapshot.params['data.personId'];
      
    }
    ngOnInit() {
        console.log(this.data)
      
    }
}