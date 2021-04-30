jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { AlumnoService } from '../service/alumno.service';
import { IAlumno, Alumno } from '../alumno.model';
import { ITutor } from 'app/entities/tutor/tutor.model';
import { TutorService } from 'app/entities/tutor/service/tutor.service';
import { ICentro } from 'app/entities/centro/centro.model';
import { CentroService } from 'app/entities/centro/service/centro.service';
import { IEmpresa } from 'app/entities/empresa/empresa.model';
import { EmpresaService } from 'app/entities/empresa/service/empresa.service';
import { ICiclo } from 'app/entities/ciclo/ciclo.model';
import { CicloService } from 'app/entities/ciclo/service/ciclo.service';

import { AlumnoUpdateComponent } from './alumno-update.component';

describe('Component Tests', () => {
  describe('Alumno Management Update Component', () => {
    let comp: AlumnoUpdateComponent;
    let fixture: ComponentFixture<AlumnoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let alumnoService: AlumnoService;
    let tutorService: TutorService;
    let centroService: CentroService;
    let empresaService: EmpresaService;
    let cicloService: CicloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AlumnoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(AlumnoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AlumnoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      alumnoService = TestBed.inject(AlumnoService);
      tutorService = TestBed.inject(TutorService);
      centroService = TestBed.inject(CentroService);
      empresaService = TestBed.inject(EmpresaService);
      cicloService = TestBed.inject(CicloService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Tutor query and add missing value', () => {
        const alumno: IAlumno = { id: 456 };
        const tutor: ITutor = { id: 19799 };
        alumno.tutor = tutor;

        const tutorCollection: ITutor[] = [{ id: 99078 }];
        spyOn(tutorService, 'query').and.returnValue(of(new HttpResponse({ body: tutorCollection })));
        const additionalTutors = [tutor];
        const expectedCollection: ITutor[] = [...additionalTutors, ...tutorCollection];
        spyOn(tutorService, 'addTutorToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ alumno });
        comp.ngOnInit();

        expect(tutorService.query).toHaveBeenCalled();
        expect(tutorService.addTutorToCollectionIfMissing).toHaveBeenCalledWith(tutorCollection, ...additionalTutors);
        expect(comp.tutorsSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Centro query and add missing value', () => {
        const alumno: IAlumno = { id: 456 };
        const centro: ICentro = { id: 93829 };
        alumno.centro = centro;

        const centroCollection: ICentro[] = [{ id: 31076 }];
        spyOn(centroService, 'query').and.returnValue(of(new HttpResponse({ body: centroCollection })));
        const additionalCentros = [centro];
        const expectedCollection: ICentro[] = [...additionalCentros, ...centroCollection];
        spyOn(centroService, 'addCentroToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ alumno });
        comp.ngOnInit();

        expect(centroService.query).toHaveBeenCalled();
        expect(centroService.addCentroToCollectionIfMissing).toHaveBeenCalledWith(centroCollection, ...additionalCentros);
        expect(comp.centrosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Empresa query and add missing value', () => {
        const alumno: IAlumno = { id: 456 };
        const empresa: IEmpresa = { id: 7992 };
        alumno.empresa = empresa;

        const empresaCollection: IEmpresa[] = [{ id: 91555 }];
        spyOn(empresaService, 'query').and.returnValue(of(new HttpResponse({ body: empresaCollection })));
        const additionalEmpresas = [empresa];
        const expectedCollection: IEmpresa[] = [...additionalEmpresas, ...empresaCollection];
        spyOn(empresaService, 'addEmpresaToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ alumno });
        comp.ngOnInit();

        expect(empresaService.query).toHaveBeenCalled();
        expect(empresaService.addEmpresaToCollectionIfMissing).toHaveBeenCalledWith(empresaCollection, ...additionalEmpresas);
        expect(comp.empresasSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Ciclo query and add missing value', () => {
        const alumno: IAlumno = { id: 456 };
        const ciclo: ICiclo = { id: 42969 };
        alumno.ciclo = ciclo;

        const cicloCollection: ICiclo[] = [{ id: 52942 }];
        spyOn(cicloService, 'query').and.returnValue(of(new HttpResponse({ body: cicloCollection })));
        const additionalCiclos = [ciclo];
        const expectedCollection: ICiclo[] = [...additionalCiclos, ...cicloCollection];
        spyOn(cicloService, 'addCicloToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ alumno });
        comp.ngOnInit();

        expect(cicloService.query).toHaveBeenCalled();
        expect(cicloService.addCicloToCollectionIfMissing).toHaveBeenCalledWith(cicloCollection, ...additionalCiclos);
        expect(comp.ciclosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const alumno: IAlumno = { id: 456 };
        const tutor: ITutor = { id: 27190 };
        alumno.tutor = tutor;
        const centro: ICentro = { id: 70260 };
        alumno.centro = centro;
        const empresa: IEmpresa = { id: 48815 };
        alumno.empresa = empresa;
        const ciclo: ICiclo = { id: 56219 };
        alumno.ciclo = ciclo;

        activatedRoute.data = of({ alumno });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(alumno));
        expect(comp.tutorsSharedCollection).toContain(tutor);
        expect(comp.centrosSharedCollection).toContain(centro);
        expect(comp.empresasSharedCollection).toContain(empresa);
        expect(comp.ciclosSharedCollection).toContain(ciclo);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const alumno = { id: 123 };
        spyOn(alumnoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ alumno });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: alumno }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(alumnoService.update).toHaveBeenCalledWith(alumno);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const alumno = new Alumno();
        spyOn(alumnoService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ alumno });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: alumno }));
        saveSubject.complete();

        // THEN
        expect(alumnoService.create).toHaveBeenCalledWith(alumno);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const alumno = { id: 123 };
        spyOn(alumnoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ alumno });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(alumnoService.update).toHaveBeenCalledWith(alumno);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackTutorById', () => {
        it('Should return tracked Tutor primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTutorById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCentroById', () => {
        it('Should return tracked Centro primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCentroById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackEmpresaById', () => {
        it('Should return tracked Empresa primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackEmpresaById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCicloById', () => {
        it('Should return tracked Ciclo primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCicloById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
