import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss']
})
export class SucursalesComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {}

  openMediumModal(mediumModalContent) {
    this.modalService.open(mediumModalContent);
  }

}
