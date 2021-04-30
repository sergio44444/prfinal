import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICiclo, Ciclo } from '../ciclo.model';

import { CicloService } from './ciclo.service';

describe('Service Tests', () => {
  describe('Ciclo Service', () => {
    let service: CicloService;
    let httpMock: HttpTestingController;
    let elemDefault: ICiclo;
    let expectedResult: ICiclo | ICiclo[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CicloService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nombre: 'AAAAAAA',
        clave: 'AAAAAAA',
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

      it('should create a Ciclo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Ciclo()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Ciclo', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombre: 'BBBBBB',
            clave: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Ciclo', () => {
        const patchObject = Object.assign({}, new Ciclo());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Ciclo', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombre: 'BBBBBB',
            clave: 'BBBBBB',
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

      it('should delete a Ciclo', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCicloToCollectionIfMissing', () => {
        it('should add a Ciclo to an empty array', () => {
          const ciclo: ICiclo = { id: 123 };
          expectedResult = service.addCicloToCollectionIfMissing([], ciclo);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(ciclo);
        });

        it('should not add a Ciclo to an array that contains it', () => {
          const ciclo: ICiclo = { id: 123 };
          const cicloCollection: ICiclo[] = [
            {
              ...ciclo,
            },
            { id: 456 },
          ];
          expectedResult = service.addCicloToCollectionIfMissing(cicloCollection, ciclo);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Ciclo to an array that doesn't contain it", () => {
          const ciclo: ICiclo = { id: 123 };
          const cicloCollection: ICiclo[] = [{ id: 456 }];
          expectedResult = service.addCicloToCollectionIfMissing(cicloCollection, ciclo);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(ciclo);
        });

        it('should add only unique Ciclo to an array', () => {
          const cicloArray: ICiclo[] = [{ id: 123 }, { id: 456 }, { id: 21536 }];
          const cicloCollection: ICiclo[] = [{ id: 123 }];
          expectedResult = service.addCicloToCollectionIfMissing(cicloCollection, ...cicloArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const ciclo: ICiclo = { id: 123 };
          const ciclo2: ICiclo = { id: 456 };
          expectedResult = service.addCicloToCollectionIfMissing([], ciclo, ciclo2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(ciclo);
          expect(expectedResult).toContain(ciclo2);
        });

        it('should accept null and undefined values', () => {
          const ciclo: ICiclo = { id: 123 };
          expectedResult = service.addCicloToCollectionIfMissing([], null, ciclo, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(ciclo);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
