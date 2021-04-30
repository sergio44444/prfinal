import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICiclo, getCicloIdentifier } from '../ciclo.model';

export type EntityResponseType = HttpResponse<ICiclo>;
export type EntityArrayResponseType = HttpResponse<ICiclo[]>;

@Injectable({ providedIn: 'root' })
export class CicloService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/ciclos');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(ciclo: ICiclo): Observable<EntityResponseType> {
    return this.http.post<ICiclo>(this.resourceUrl, ciclo, { observe: 'response' });
  }

  update(ciclo: ICiclo): Observable<EntityResponseType> {
    return this.http.put<ICiclo>(`${this.resourceUrl}/${getCicloIdentifier(ciclo) as number}`, ciclo, { observe: 'response' });
  }

  partialUpdate(ciclo: ICiclo): Observable<EntityResponseType> {
    return this.http.patch<ICiclo>(`${this.resourceUrl}/${getCicloIdentifier(ciclo) as number}`, ciclo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICiclo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICiclo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCicloToCollectionIfMissing(cicloCollection: ICiclo[], ...ciclosToCheck: (ICiclo | null | undefined)[]): ICiclo[] {
    const ciclos: ICiclo[] = ciclosToCheck.filter(isPresent);
    if (ciclos.length > 0) {
      const cicloCollectionIdentifiers = cicloCollection.map(cicloItem => getCicloIdentifier(cicloItem)!);
      const ciclosToAdd = ciclos.filter(cicloItem => {
        const cicloIdentifier = getCicloIdentifier(cicloItem);
        if (cicloIdentifier == null || cicloCollectionIdentifiers.includes(cicloIdentifier)) {
          return false;
        }
        cicloCollectionIdentifiers.push(cicloIdentifier);
        return true;
      });
      return [...ciclosToAdd, ...cicloCollection];
    }
    return cicloCollection;
  }
}
