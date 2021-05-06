import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { EmpresaComponent } from './list/empresa.component';
import { EmpresaDetailComponent } from './detail/empresa-detail.component';
import { EmpresaUpdateComponent } from './update/empresa-update.component';
import { EmpresaDeleteDialogComponent } from './delete/empresa-delete-dialog.component';
import { EmpresaRoutingModule } from './route/empresa-routing.module';
import { EmpresaFiltroPipe } from './list/cliente.filtro.pipe';

@NgModule({
  imports: [SharedModule, EmpresaRoutingModule],
  declarations: [EmpresaComponent, EmpresaDetailComponent, EmpresaUpdateComponent, EmpresaDeleteDialogComponent, EmpresaFiltroPipe],
  entryComponents: [EmpresaDeleteDialogComponent],
})
export class EmpresaModule {}
