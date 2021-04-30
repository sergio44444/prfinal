import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICentro, getCentroIdentifier } from '../centro.model';

export type EntityResponseType = HttpResponse<ICentro>;
export type EntityArrayResponseType = HttpResponse<ICentro[]>;

@Injectable({ providedIn: 'root' })
export class CentroService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/centros');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(centro: ICentro): Observable<EntityResponseType> {
    return this.http.post<ICentro>(this.resourceUrl, centro, { observe: 'response' });
  }

  update(centro: ICentro): Observable<EntityResponseType> {
    return this.http.put<ICentro>(`${this.resourceUrl}/${getCentroIdentifier(centro) as number}`, centro, { observe: 'response' });
  }

  partialUpdate(centro: ICentro): Observable<EntityResponseType> {
    return this.http.patch<ICentro>(`${this.resourceUrl}/${getCentroIdentifier(centro) as number}`, centro, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICentro>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICentro[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCentroToCollectionIfMissing(centroCollection: ICentro[], ...centrosToCheck: (ICentro | null | undefined)[]): ICentro[] {
    const centros: ICentro[] = centrosToCheck.filter(isPresent);
    if (centros.length > 0) {
      const centroCollectionIdentifiers = centroCollection.map(centroItem => getCentroIdentifier(centroItem)!);
      const centrosToAdd = centros.filter(centroItem => {
        const centroIdentifier = getCentroIdentifier(centroItem);
        if (centroIdentifier == null || centroCollectionIdentifiers.includes(centroIdentifier)) {
          return false;
        }
        centroCollectionIdentifiers.push(centroIdentifier);
        return true;
      });
      return [...centrosToAdd, ...centroCollection];
    }
    return centroCollection;
  }
}
