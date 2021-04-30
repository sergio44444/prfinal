import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITutor, getTutorIdentifier } from '../tutor.model';

export type EntityResponseType = HttpResponse<ITutor>;
export type EntityArrayResponseType = HttpResponse<ITutor[]>;

@Injectable({ providedIn: 'root' })
export class TutorService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/tutors');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(tutor: ITutor): Observable<EntityResponseType> {
    return this.http.post<ITutor>(this.resourceUrl, tutor, { observe: 'response' });
  }

  update(tutor: ITutor): Observable<EntityResponseType> {
    return this.http.put<ITutor>(`${this.resourceUrl}/${getTutorIdentifier(tutor) as number}`, tutor, { observe: 'response' });
  }

  partialUpdate(tutor: ITutor): Observable<EntityResponseType> {
    return this.http.patch<ITutor>(`${this.resourceUrl}/${getTutorIdentifier(tutor) as number}`, tutor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITutor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITutor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTutorToCollectionIfMissing(tutorCollection: ITutor[], ...tutorsToCheck: (ITutor | null | undefined)[]): ITutor[] {
    const tutors: ITutor[] = tutorsToCheck.filter(isPresent);
    if (tutors.length > 0) {
      const tutorCollectionIdentifiers = tutorCollection.map(tutorItem => getTutorIdentifier(tutorItem)!);
      const tutorsToAdd = tutors.filter(tutorItem => {
        const tutorIdentifier = getTutorIdentifier(tutorItem);
        if (tutorIdentifier == null || tutorCollectionIdentifiers.includes(tutorIdentifier)) {
          return false;
        }
        tutorCollectionIdentifiers.push(tutorIdentifier);
        return true;
      });
      return [...tutorsToAdd, ...tutorCollection];
    }
    return tutorCollection;
  }
}
