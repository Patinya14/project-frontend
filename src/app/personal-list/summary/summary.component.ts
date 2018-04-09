import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
})
export class SummaryComponent implements OnInit {
    public rows = {};
    constructor(
    ) { }
    ngOnInit() {
    }

}