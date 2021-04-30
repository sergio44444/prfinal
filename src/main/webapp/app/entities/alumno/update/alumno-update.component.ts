import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IAlumno, Alumno } from '../alumno.model';
import { AlumnoService } from '../service/alumno.service';
import { ITutor } from 'app/entities/tutor/tutor.model';
import { TutorService } from 'app/entities/tutor/service/tutor.service';
import { ICentro } from 'app/entities/centro/centro.model';
import { CentroService } from 'app/entities/centro/service/centro.service';
import { IEmpresa } from 'app/entities/empresa/empresa.model';
import { EmpresaService } from 'app/entities/empresa/service/empresa.service';
import { ICiclo } from 'app/entities/ciclo/ciclo.model';
import { CicloService } from 'app/entities/ciclo/service/ciclo.service';

@Component({
  selector: 'jhi-alumno-update',
  templateUrl: './alumno-update.component.html',
})
export class AlumnoUpdateComponent implements OnInit {
  isSaving = false;

  tutorsSharedCollection: ITutor[] = [];
  centrosSharedCollection: ICentro[] = [];
  empresasSharedCollection: IEmpresa[] = [];
  ciclosSharedCollection: ICiclo[] = [];

  editForm = this.fb.group({
    id: [],
    dni: [],
    nombre: [],
    apellido: [],
    tutor: [],
    centro: [],
    empresa: [],
    ciclo: [],
  });

  constructor(
    protected alumnoService: AlumnoService,
    protected tutorService: TutorService,
    protected centroService: CentroService,
    protected empresaService: EmpresaService,
    protected cicloService: CicloService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alumno }) => {
      this.updateForm(alumno);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const alumno = this.createFromForm();
    if (alumno.id !== undefined) {
      this.subscribeToSaveResponse(this.alumnoService.update(alumno));
    } else {
      this.subscribeToSaveResponse(this.alumnoService.create(alumno));
    }
  }

  trackTutorById(index: number, item: ITutor): number {
    return item.id!;
  }

  trackCentroById(index: number, item: ICentro): number {
    return item.id!;
  }

  trackEmpresaById(index: number, item: IEmpresa): number {
    return item.id!;
  }

  trackCicloById(index: number, item: ICiclo): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlumno>>): void {
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

  protected updateForm(alumno: IAlumno): void {
    this.editForm.patchValue({
      id: alumno.id,
      dni: alumno.dni,
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      tutor: alumno.tutor,
      centro: alumno.centro,
      empresa: alumno.empresa,
      ciclo: alumno.ciclo,
    });

    this.tutorsSharedCollection = this.tutorService.addTutorToCollectionIfMissing(this.tutorsSharedCollection, alumno.tutor);
    this.centrosSharedCollection = this.centroService.addCentroToCollectionIfMissing(this.centrosSharedCollection, alumno.centro);
    this.empresasSharedCollection = this.empresaService.addEmpresaToCollectionIfMissing(this.empresasSharedCollection, alumno.empresa);
    this.ciclosSharedCollection = this.cicloService.addCicloToCollectionIfMissing(this.ciclosSharedCollection, alumno.ciclo);
  }

  protected loadRelationshipsOptions(): void {
    this.tutorService
      .query()
      .pipe(map((res: HttpResponse<ITutor[]>) => res.body ?? []))
      .pipe(map((tutors: ITutor[]) => this.tutorService.addTutorToCollectionIfMissing(tutors, this.editForm.get('tutor')!.value)))
      .subscribe((tutors: ITutor[]) => (this.tutorsSharedCollection = tutors));

    this.centroService
      .query()
      .pipe(map((res: HttpResponse<ICentro[]>) => res.body ?? []))
      .pipe(map((centros: ICentro[]) => this.centroService.addCentroToCollectionIfMissing(centros, this.editForm.get('centro')!.value)))
      .subscribe((centros: ICentro[]) => (this.centrosSharedCollection = centros));

    this.empresaService
      .query()
      .pipe(map((res: HttpResponse<IEmpresa[]>) => res.body ?? []))
      .pipe(
        map((empresas: IEmpresa[]) => this.empresaService.addEmpresaToCollectionIfMissing(empresas, this.editForm.get('empresa')!.value))
      )
      .subscribe((empresas: IEmpresa[]) => (this.empresasSharedCollection = empresas));

    this.cicloService
      .query()
      .pipe(map((res: HttpResponse<ICiclo[]>) => res.body ?? []))
      .pipe(map((ciclos: ICiclo[]) => this.cicloService.addCicloToCollectionIfMissing(ciclos, this.editForm.get('ciclo')!.value)))
      .subscribe((ciclos: ICiclo[]) => (this.ciclosSharedCollection = ciclos));
  }

  protected createFromForm(): IAlumno {
    return {
      ...new Alumno(),
      id: this.editForm.get(['id'])!.value,
      dni: this.editForm.get(['dni'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      apellido: this.editForm.get(['apellido'])!.value,
      tutor: this.editForm.get(['tutor'])!.value,
      centro: this.editForm.get(['centro'])!.value,
      empresa: this.editForm.get(['empresa'])!.value,
      ciclo: this.editForm.get(['ciclo'])!.value,
    };
  }
}
