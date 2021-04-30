import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITutor, Tutor } from '../tutor.model';
import { TutorService } from '../service/tutor.service';

@Injectable({ providedIn: 'root' })
export class TutorRoutingResolveService implements Resolve<ITutor> {
  constructor(protected service: TutorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITutor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tutor: HttpResponse<Tutor>) => {
          if (tutor.body) {
            return of(tutor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Tutor());
  }
}
