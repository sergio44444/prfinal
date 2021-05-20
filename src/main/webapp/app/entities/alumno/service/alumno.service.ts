import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAlumno, getAlumnoIdentifier } from '../alumno.model';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<IAlumno>;
export type EntityArrayResponseType = HttpResponse<IAlumno[]>;

@Injectable({ providedIn: 'root' })
export class AlumnoService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/alumnos');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(alumno: IAlumno): Observable<EntityResponseType> {
    return this.http.post<IAlumno>(this.resourceUrl, alumno, { observe: 'response' });
  }

  update(alumno: IAlumno): Observable<EntityResponseType> {
    return this.http.put<IAlumno>(`${this.resourceUrl}/${getAlumnoIdentifier(alumno) as number}`, alumno, { observe: 'response' });
  }

  partialUpdate(alumno: IAlumno): Observable<EntityResponseType> {
    return this.http.patch<IAlumno>(`${this.resourceUrl}/${getAlumnoIdentifier(alumno) as number}`, alumno, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAlumno>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(clave?: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    let url = '';
    if (clave !== '' && clave) {
      url = `${this.resourceUrl}?clave=${clave}`;
    } else {
      url = this.resourceUrl;
    }
    return this.http.get<IAlumno[]>(url, { params: options, observe: 'response' });
  }

  queryalumnoxdni(dni?: string | undefined | null, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    let url = '';
    if (dni !== '' && dni) {
      url = `${this.resourceUrl}?dni=${dni}`;
    } else {
      url = this.resourceUrl;
    }
    return this.http.get<IAlumno[]>(url, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAlumnoToCollectionIfMissing(alumnoCollection: IAlumno[], ...alumnosToCheck: (IAlumno | null | undefined)[]): IAlumno[] {
    const alumnos: IAlumno[] = alumnosToCheck.filter(isPresent);
    if (alumnos.length > 0) {
      const alumnoCollectionIdentifiers = alumnoCollection.map(alumnoItem => getAlumnoIdentifier(alumnoItem)!);
      const alumnosToAdd = alumnos.filter(alumnoItem => {
        const alumnoIdentifier = getAlumnoIdentifier(alumnoItem);
        if (alumnoIdentifier == null || alumnoCollectionIdentifiers.includes(alumnoIdentifier)) {
          return false;
        }
        alumnoCollectionIdentifiers.push(alumnoIdentifier);
        return true;
      });
      return [...alumnosToAdd, ...alumnoCollection];
    }
    return alumnoCollection;
  }
}
