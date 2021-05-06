import { PipeTransform, Pipe } from '@angular/core';
import { Empresa } from '../empresa.model';

@Pipe({
  name: 'empresafiltro',
})
export class EmpresaFiltroPipe implements PipeTransform {
  transform(empresas: Empresa[], searchTerm: string, searchTerm2: string): Empresa[] {
    if (searchTerm !== '') {
      empresas = empresas.filter(empresa => empresa.numeroConvenio?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
    if (searchTerm2 !== '') {
      empresas = empresas.filter(empresa => empresa.localidad?.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1);
    }
    return empresas;
  }
}
