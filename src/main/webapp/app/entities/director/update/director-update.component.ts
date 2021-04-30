import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDirector, Director } from '../director.model';
import { DirectorService } from '../service/director.service';

@Component({
  selector: 'jhi-director-update',
  templateUrl: './director-update.component.html',
})
export class DirectorUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    dni: [],
    nombre: [],
    apellido: [],
  });

  constructor(protected directorService: DirectorService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ director }) => {
      this.updateForm(director);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const director = this.createFromForm();
    if (director.id !== undefined) {
      this.subscribeToSaveResponse(this.directorService.update(director));
    } else {
      this.subscribeToSaveResponse(this.directorService.create(director));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDirector>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(director: IDirector): void {
    this.editForm.patchValue({
      id: director.id,
      dni: director.dni,
      nombre: director.nombre,
      apellido: director.apellido,
    });
  }

  protected createFromForm(): IDirector {
    return {
      ...new Director(),
      id: this.editForm.get(['id'])!.value,
      dni: this.editForm.get(['dni'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      apellido: this.editForm.get(['apellido'])!.value,
    };
  }
}
