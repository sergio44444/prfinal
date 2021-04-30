import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITutor } from '../tutor.model';
import { TutorService } from '../service/tutor.service';

@Component({
  templateUrl: './tutor-delete-dialog.component.html',
})
export class TutorDeleteDialogComponent {
  tutor?: ITutor;

  constructor(protected tutorService: TutorService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tutorService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
