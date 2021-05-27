import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alumno, IAlumno } from 'app/entities/alumno/alumno.model';
import { AlumnoService } from 'app/entities/alumno/service/alumno.service';

@Component({
  selector: 'jhi-anexo21',
  templateUrl: './anexo21.component.html',
})
export class Anexo21Component implements OnInit {
  alumnos: IAlumno[] = [];
  traerdatos?: IAlumno;
  array?: any;

  alumnosSharedCollection: IAlumno[] = [];
  editForm = this.fb.group({
    alumno: [],
  });
  isLoading: boolean | undefined;
  itemsPerPage: any;
  page?: number | undefined;
  predicate!: string;
  ascending!: boolean;
  totalItems: number | undefined;
  router: any;
  ngbPaginationPage: number | undefined;

  constructor(protected activatedRoute: ActivatedRoute, protected alumnoService: AlumnoService, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  trackAlumnoById(index: number, item: IAlumno): number {
    return item.id!;
  }

  trackId(index: number, item: IAlumno): number {
    return item.id!;
  }

  cargarAlumnos(): void {
    this.alumnoService.query().subscribe((res: HttpResponse<IAlumno[]>) => {
      this.alumnosSharedCollection = res.body ?? [];
    });
  }

  funcion(event: any): void {
    // eslint-disable-next-line no-console
    console.log(event.target.value);
    this.array = event.target.value.split('-');
    if (this.array != null) {
      this.alumnoService.find(this.array[0]).subscribe((res: any) => {
        this.traerdatos = res.body ?? [];
        // eslint-disable-next-line no-console
        console.log(this.traerdatos?.tutor?.id);
        if (this.traerdatos != null) {
          this.alumnoService.generate(this.traerdatos);
          // eslint-disable-next-line no-console
          console.log(this.traerdatos);
        }
      });
    }
  }
}
