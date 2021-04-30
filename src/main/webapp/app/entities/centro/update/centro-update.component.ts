import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICentro, Centro } from '../centro.model';
import { CentroService } from '../service/centro.service';
import { IDirector } from 'app/entities/director/director.model';
import { DirectorService } from 'app/entities/director/service/director.service';

@Component({
  selector: 'jhi-centro-update',
  templateUrl: './centro-update.component.html',
})
export class CentroUpdateComponent implements OnInit {
  isSaving = false;

  directorsCollection: IDirector[] = [];

  editForm = this.fb.group({
    id: [],
    denominacion: [],
    codigo: [],
    domicilio: [],
    localidad: [],
    municipio: [],
    provincia: [],
    codigoPostal: [],
    director: [],
  });

  constructor(
    protected centroService: CentroService,
    protected directorService: DirectorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ centro }) => {
      this.updateForm(centro);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const centro = this.createFromForm();
    if (centro.id !== undefined) {
      this.subscribeToSaveResponse(this.centroService.update(centro));
    } else {
      this.subscribeToSaveResponse(this.centroService.create(centro));
    }
  }

  trackDirectorById(index: number, item: IDirector): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICentro>>): void {
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

  protected updateForm(centro: ICentro): void {
    this.editForm.patchValue({
      id: centro.id,
      denominacion: centro.denominacion,
      codigo: centro.codigo,
      domicilio: centro.domicilio,
      localidad: centro.localidad,
      municipio: centro.municipio,
      provincia: centro.provincia,
      codigoPostal: centro.codigoPostal,
      director: centro.director,
    });

    this.directorsCollection = this.directorService.addDirectorToCollectionIfMissing(this.directorsCollection, centro.director);
  }

  protected loadRelationshipsOptions(): void {
    this.directorService
      .query({ filter: 'centro-is-null' })
      .pipe(map((res: HttpResponse<IDirector[]>) => res.body ?? []))
      .pipe(
        map((directors: IDirector[]) =>
          this.directorService.addDirectorToCollectionIfMissing(directors, this.editForm.get('director')!.value)
        )
      )
      .subscribe((directors: IDirector[]) => (this.directorsCollection = directors));
  }

  protected createFromForm(): ICentro {
    return {
      ...new Centro(),
      id: this.editForm.get(['id'])!.value,
      denominacion: this.editForm.get(['denominacion'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      domicilio: this.editForm.get(['domicilio'])!.value,
      localidad: this.editForm.get(['localidad'])!.value,
      municipio: this.editForm.get(['municipio'])!.value,
      provincia: this.editForm.get(['provincia'])!.value,
      codigoPostal: this.editForm.get(['codigoPostal'])!.value,
      director: this.editForm.get(['director'])!.value,
    };
  }
}
