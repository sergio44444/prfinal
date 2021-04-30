import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICiclo } from '../ciclo.model';
import { CicloService } from '../service/ciclo.service';

@Component({
  templateUrl: './ciclo-delete-dialog.component.html',
})
export class CicloDeleteDialogComponent {
  ciclo?: ICiclo;

  constructor(protected cicloService: CicloService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cicloService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
