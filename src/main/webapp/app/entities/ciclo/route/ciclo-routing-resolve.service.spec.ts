jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICiclo, Ciclo } from '../ciclo.model';
import { CicloService } from '../service/ciclo.service';

import { CicloRoutingResolveService } from './ciclo-routing-resolve.service';

describe('Service Tests', () => {
  describe('Ciclo routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CicloRoutingResolveService;
    let service: CicloService;
    let resultCiclo: ICiclo | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CicloRoutingResolveService);
      service = TestBed.inject(CicloService);
      resultCiclo = undefined;
    });

    describe('resolve', () => {
      it('should return ICiclo returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCiclo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCiclo).toEqual({ id: 123 });
      });

      it('should return new ICiclo if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCiclo = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCiclo).toEqual(new Ciclo());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCiclo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCiclo).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
