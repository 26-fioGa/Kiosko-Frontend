import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-venta',
    templateUrl: './venta.component.html',
    styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {

    constructor(private modalService: NgbModal) {}

    ngOnInit(): void {}

    openMediumModal(mediumModalContent) {
        this.modalService.open(mediumModalContent);
    }

}