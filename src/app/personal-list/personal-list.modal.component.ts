import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-personal-list-modal',
    templateUrl: './personal-list.modal.component.html',
})

export class PersonalListModalComponent implements OnInit {
    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor() { }
    ngOnInit() {
    }
    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }
}