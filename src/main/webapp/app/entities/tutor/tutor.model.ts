import { ICentro } from 'app/entities/centro/centro.model';
import { IAlumno } from 'app/entities/alumno/alumno.model';

export interface ITutor {
  id?: number;
  dni?: string | null;
  nombre?: string | null;
  apellido?: string | null;
  centro?: ICentro | null;
  alumnos?: IAlumno[] | null;
}

export class Tutor implements ITutor {
  constructor(
    public id?: number,
    public dni?: string | null,
    public nombre?: string | null,
    public apellido?: string | null,
    public centro?: ICentro | null,
    public alumnos?: IAlumno[] | null
  ) {}
}

export function getTutorIdentifier(tutor: ITutor): number | undefined {
  return tutor.id;
}
