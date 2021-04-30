jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CicloService } from '../service/ciclo.service';
import { ICiclo, Ciclo } from '../ciclo.model';
import { ICentro } from 'app/entities/centro/centro.model';
import { CentroService } from 'app/entities/centro/service/centro.service';

import { CicloUpdateComponent } from './ciclo-update.component';

describe('Component Tests', () => {
  describe('Ciclo Management Update Component', () => {
    let comp: CicloUpdateComponent;
    let fixture: ComponentFixture<CicloUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cicloService: CicloService;
    let centroService: CentroService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CicloUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CicloUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CicloUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cicloService = TestBed.inject(CicloService);
      centroService = TestBed.inject(CentroService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Centro query and add missing value', () => {
        const ciclo: ICiclo = { id: 456 };
        const centro: ICentro = { id: 59522 };
        ciclo.centro = centro;

        const centroCollection: ICentro[] = [{ id: 23353 }];
        spyOn(centroService, 'query').and.returnValue(of(new HttpResponse({ body: centroCollection })));
        const additionalCentros = [centro];
        const expectedCollection: ICentro[] = [...additionalCentros, ...centroCollection];
        spyOn(centroService, 'addCentroToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ ciclo });
        comp.ngOnInit();

        expect(centroService.query).toHaveBeenCalled();
        expect(centroService.addCentroToCollectionIfMissing).toHaveBeenCalledWith(centroCollection, ...additionalCentros);
        expect(comp.centrosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const ciclo: ICiclo = { id: 456 };
        const centro: ICentro = { id: 15633 };
        ciclo.centro = centro;

        activatedRoute.data = of({ ciclo });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(ciclo));
        expect(comp.centrosSharedCollection).toContain(centro);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const ciclo = { id: 123 };
        spyOn(cicloService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ ciclo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: ciclo }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cicloService.update).toHaveBeenCalledWith(ciclo);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const ciclo = new Ciclo();
        spyOn(cicloService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ ciclo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: ciclo }));
        saveSubject.complete();

        // THEN
        expect(cicloService.create).toHaveBeenCalledWith(ciclo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const ciclo = { id: 123 };
        spyOn(cicloService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ ciclo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cicloService.update).toHaveBeenCalledWith(ciclo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackCentroById', () => {
        it('Should return tracked Centro primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCentroById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
