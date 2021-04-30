import { ICentro } from 'app/entities/centro/centro.model';

export interface IDirector {
  id?: number;
  dni?: string | null;
  nombre?: string | null;
  apellido?: string | null;
  centro?: ICentro | null;
}

export class Director implements IDirector {
  constructor(
    public id?: number,
    public dni?: string | null,
    public nombre?: string | null,
    public apellido?: string | null,
    public centro?: ICentro | null
  ) {}
}

export function getDirectorIdentifier(director: IDirector): number | undefined {
  return director.id;
}
