import { IAlumno } from 'app/entities/alumno/alumno.model';
import { ICentro } from 'app/entities/centro/centro.model';

export interface ICiclo {
  id?: number;
  nombre?: string | null;
  clave?: string | null;
  alumnos?: IAlumno[] | null;
  centro?: ICentro | null;
}

export class Ciclo implements ICiclo {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public clave?: string | null,
    public alumnos?: IAlumno[] | null,
    public centro?: ICentro | null
  ) {}
}

export function getCicloIdentifier(ciclo: ICiclo): number | undefined {
  return ciclo.id;
}
