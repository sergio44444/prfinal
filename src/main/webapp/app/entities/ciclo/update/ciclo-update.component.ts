import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICiclo, Ciclo } from '../ciclo.model';
import { CicloService } from '../service/ciclo.service';
import { ICentro } from 'app/entities/centro/centro.model';
import { CentroService } from 'app/entities/centro/service/centro.service';

@Component({
  selector: 'jhi-ciclo-update',
  templateUrl: './ciclo-update.component.html',
})
export class CicloUpdateComponent implements OnInit {
  isSaving = false;

  centrosSharedCollection: ICentro[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    clave: [],
    centro: [],
  });

  constructor(
    protected cicloService: CicloService,
    protected centroService: CentroService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ciclo }) => {
      this.updateForm(ciclo);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ciclo = this.createFromForm();
    if (ciclo.id !== undefined) {
      this.subscribeToSaveResponse(this.cicloService.update(ciclo));
    } else {
      this.subscribeToSaveResponse(this.cicloService.create(ciclo));
    }
  }

  trackCentroById(index: number, item: ICentro): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICiclo>>): void {
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

  protected updateForm(ciclo: ICiclo): void {
    this.editForm.patchValue({
      id: ciclo.id,
      nombre: ciclo.nombre,
      clave: ciclo.clave,
      centro: ciclo.centro,
    });

    this.centrosSharedCollection = this.centroService.addCentroToCollectionIfMissing(this.centrosSharedCollection, ciclo.centro);
  }

  protected loadRelationshipsOptions(): void {
    this.centroService
      .query()
      .pipe(map((res: HttpResponse<ICentro[]>) => res.body ?? []))
      .pipe(map((centros: ICentro[]) => this.centroService.addCentroToCollectionIfMissing(centros, this.editForm.get('centro')!.value)))
      .subscribe((centros: ICentro[]) => (this.centrosSharedCollection = centros));
  }

  protected createFromForm(): ICiclo {
    return {
      ...new Ciclo(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      clave: this.editForm.get(['clave'])!.value,
      centro: this.editForm.get(['centro'])!.value,
    };
  }
}
