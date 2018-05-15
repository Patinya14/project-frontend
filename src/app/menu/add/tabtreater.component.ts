import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CertificateService } from '../../service/certificate.service';
import { TabsetComponent , AccordionModule} from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-tabtreater',
    templateUrl: './tabtreater.component.html',
    styleUrls: ['./tabtreater.component.css']
})

export class TabTreaterComponent implements OnInit {
    public rows = {};
    public id;
    @ViewChild('staticTabs') staticTabs: TabsetComponent;
    constructor(
        private certificateService: CertificateService,
        private activatedroute: ActivatedRoute,
     ) {
        this.id = this.activatedroute.snapshot.params['personId'];
    }
    ngOnInit() {
        this.certificateService.getCerById(this.id).subscribe(result => {
            this.rows = result;
        })
     
    }

}