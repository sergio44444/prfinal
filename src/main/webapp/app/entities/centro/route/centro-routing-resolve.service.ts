import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICentro, Centro } from '../centro.model';
import { CentroService } from '../service/centro.service';

@Injectable({ providedIn: 'root' })
export class CentroRoutingResolveService implements Resolve<ICentro> {
  constructor(protected service: CentroService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICentro> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((centro: HttpResponse<Centro>) => {
          if (centro.body) {
            return of(centro.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Centro());
  }
}
