import { IDirector } from 'app/entities/director/director.model';
import { ITutor } from 'app/entities/tutor/tutor.model';
import { ICiclo } from 'app/entities/ciclo/ciclo.model';
import { IAlumno } from 'app/entities/alumno/alumno.model';

export interface ICentro {
  id?: number;
  denominacion?: string | null;
  codigo?: string | null;
  domicilio?: string | null;
  localidad?: string | null;
  municipio?: string | null;
  provincia?: string | null;
  codigoPostal?: number | null;
  director?: IDirector | null;
  tutors?: ITutor[] | null;
  ciclos?: ICiclo[] | null;
  alumnos?: IAlumno[] | null;
}

export class Centro implements ICentro {
  constructor(
    public id?: number,
    public denominacion?: string | null,
    public codigo?: string | null,
    public domicilio?: string | null,
    public localidad?: string | null,
    public municipio?: string | null,
    public provincia?: string | null,
    public codigoPostal?: number | null,
    public director?: IDirector | null,
    public tutors?: ITutor[] | null,
    public ciclos?: ICiclo[] | null,
    public alumnos?: IAlumno[] | null
  ) {}
}

export function getCentroIdentifier(centro: ICentro): number | undefined {
  return centro.id;
}
