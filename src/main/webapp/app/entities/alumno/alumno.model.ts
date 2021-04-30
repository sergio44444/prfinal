import { ITutor } from 'app/entities/tutor/tutor.model';
import { ICentro } from 'app/entities/centro/centro.model';
import { IEmpresa } from 'app/entities/empresa/empresa.model';
import { ICiclo } from 'app/entities/ciclo/ciclo.model';

export interface IAlumno {
  id?: number;
  dni?: string | null;
  nombre?: string | null;
  apellido?: string | null;
  tutor?: ITutor | null;
  centro?: ICentro | null;
  empresa?: IEmpresa | null;
  ciclo?: ICiclo | null;
}

export class Alumno implements IAlumno {
  constructor(
    public id?: number,
    public dni?: string | null,
    public nombre?: string | null,
    public apellido?: string | null,
    public tutor?: ITutor | null,
    public centro?: ICentro | null,
    public empresa?: IEmpresa | null,
    public ciclo?: ICiclo | null
  ) {}
}

export function getAlumnoIdentifier(alumno: IAlumno): number | undefined {
  return alumno.id;
}
