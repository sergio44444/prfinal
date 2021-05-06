import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-documento21',
  templateUrl: './documento21.component.html',
  styleUrls: ['./documento21.component.scss'],
})
export class Documento21Component {
  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}
}
