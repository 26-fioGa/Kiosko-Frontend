import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

    constructor(private modalService: NgbModal) {}

    ngOnInit(): void {}

    openMediumModal(mediumModalContent) {
        this.modalService.open(mediumModalContent);
    }

}