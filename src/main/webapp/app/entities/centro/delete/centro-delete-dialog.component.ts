import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICentro } from '../centro.model';
import { CentroService } from '../service/centro.service';

@Component({
  templateUrl: './centro-delete-dialog.component.html',
})
export class CentroDeleteDialogComponent {
  centro?: ICentro;

  constructor(protected centroService: CentroService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.centroService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
