import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICiclo, Ciclo } from '../ciclo.model';
import { CicloService } from '../service/ciclo.service';

@Injectable({ providedIn: 'root' })
export class CicloRoutingResolveService implements Resolve<ICiclo> {
  constructor(protected service: CicloService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICiclo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ciclo: HttpResponse<Ciclo>) => {
          if (ciclo.body) {
            return of(ciclo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Ciclo());
  }
}
