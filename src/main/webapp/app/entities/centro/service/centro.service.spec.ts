import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICentro, Centro } from '../centro.model';

import { CentroService } from './centro.service';

describe('Service Tests', () => {
  describe('Centro Service', () => {
    let service: CentroService;
    let httpMock: HttpTestingController;
    let elemDefault: ICentro;
    let expectedResult: ICentro | ICentro[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CentroService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        denominacion: 'AAAAAAA',
        codigo: 'AAAAAAA',
        domicilio: 'AAAAAAA',
        localidad: 'AAAAAAA',
        municipio: 'AAAAAAA',
        provincia: 'AAAAAAA',
        codigoPostal: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Centro', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Centro()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Centro', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            denominacion: 'BBBBBB',
            codigo: 'BBBBBB',
            domicilio: 'BBBBBB',
            localidad: 'BBBBBB',
            municipio: 'BBBBBB',
            provincia: 'BBBBBB',
            codigoPostal: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Centro', () => {
        const patchObject = Object.assign(
          {
            denominacion: 'BBBBBB',
            codigo: 'BBBBBB',
            domicilio: 'BBBBBB',
            municipio: 'BBBBBB',
            provincia: 'BBBBBB',
          },
          new Centro()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Centro', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            denominacion: 'BBBBBB',
            codigo: 'BBBBBB',
            domicilio: 'BBBBBB',
            localidad: 'BBBBBB',
            municipio: 'BBBBBB',
            provincia: 'BBBBBB',
            codigoPostal: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Centro', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCentroToCollectionIfMissing', () => {
        it('should add a Centro to an empty array', () => {
          const centro: ICentro = { id: 123 };
          expectedResult = service.addCentroToCollectionIfMissing([], centro);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(centro);
        });

        it('should not add a Centro to an array that contains it', () => {
          const centro: ICentro = { id: 123 };
          const centroCollection: ICentro[] = [
            {
              ...centro,
            },
            { id: 456 },
          ];
          expectedResult = service.addCentroToCollectionIfMissing(centroCollection, centro);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Centro to an array that doesn't contain it", () => {
          const centro: ICentro = { id: 123 };
          const centroCollection: ICentro[] = [{ id: 456 }];
          expectedResult = service.addCentroToCollectionIfMissing(centroCollection, centro);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(centro);
        });

        it('should add only unique Centro to an array', () => {
          const centroArray: ICentro[] = [{ id: 123 }, { id: 456 }, { id: 85202 }];
          const centroCollection: ICentro[] = [{ id: 123 }];
          expectedResult = service.addCentroToCollectionIfMissing(centroCollection, ...centroArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const centro: ICentro = { id: 123 };
          const centro2: ICentro = { id: 456 };
          expectedResult = service.addCentroToCollectionIfMissing([], centro, centro2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(centro);
          expect(expectedResult).toContain(centro2);
        });

        it('should accept null and undefined values', () => {
          const centro: ICentro = { id: 123 };
          expectedResult = service.addCentroToCollectionIfMissing([], null, centro, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(centro);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
