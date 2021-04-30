import { IAlumno } from 'app/entities/alumno/alumno.model';

export interface IEmpresa {
  id?: number;
  numeroConvenio?: string | null;
  localidad?: string | null;
  tutor?: string | null;
  alumnos?: IAlumno[] | null;
}

export class Empresa implements IEmpresa {
  constructor(
    public id?: number,
    public numeroConvenio?: string | null,
    public localidad?: string | null,
    public tutor?: string | null,
    public alumnos?: IAlumno[] | null
  ) {}
}

export function getEmpresaIdentifier(empresa: IEmpresa): number | undefined {
  return empresa.id;
}
