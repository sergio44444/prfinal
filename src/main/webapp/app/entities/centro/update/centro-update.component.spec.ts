jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CentroService } from '../service/centro.service';
import { ICentro, Centro } from '../centro.model';
import { IDirector } from 'app/entities/director/director.model';
import { DirectorService } from 'app/entities/director/service/director.service';

import { CentroUpdateComponent } from './centro-update.component';

describe('Component Tests', () => {
  describe('Centro Management Update Component', () => {
    let comp: CentroUpdateComponent;
    let fixture: ComponentFixture<CentroUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let centroService: CentroService;
    let directorService: DirectorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CentroUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CentroUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CentroUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      centroService = TestBed.inject(CentroService);
      directorService = TestBed.inject(DirectorService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call director query and add missing value', () => {
        const centro: ICentro = { id: 456 };
        const director: IDirector = { id: 31981 };
        centro.director = director;

        const directorCollection: IDirector[] = [{ id: 97576 }];
        spyOn(directorService, 'query').and.returnValue(of(new HttpResponse({ body: directorCollection })));
        const expectedCollection: IDirector[] = [director, ...directorCollection];
        spyOn(directorService, 'addDirectorToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ centro });
        comp.ngOnInit();

        expect(directorService.query).toHaveBeenCalled();
        expect(directorService.addDirectorToCollectionIfMissing).toHaveBeenCalledWith(directorCollection, director);
        expect(comp.directorsCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const centro: ICentro = { id: 456 };
        const director: IDirector = { id: 16023 };
        centro.director = director;

        activatedRoute.data = of({ centro });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(centro));
        expect(comp.directorsCollection).toContain(director);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const centro = { id: 123 };
        spyOn(centroService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ centro });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: centro }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(centroService.update).toHaveBeenCalledWith(centro);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const centro = new Centro();
        spyOn(centroService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ centro });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: centro }));
        saveSubject.complete();

        // THEN
        expect(centroService.create).toHaveBeenCalledWith(centro);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const centro = { id: 123 };
        spyOn(centroService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ centro });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(centroService.update).toHaveBeenCalledWith(centro);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackDirectorById', () => {
        it('Should return tracked Director primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackDirectorById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
