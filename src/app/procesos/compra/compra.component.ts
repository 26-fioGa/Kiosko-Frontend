import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-compra',
    templateUrl: './compra.component.html',
    styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit {

    constructor(private modalService: NgbModal) {}

    ngOnInit(): void {}

    openMediumModal(mediumModalContent) {
        this.modalService.open(mediumModalContent);
    }

}