import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CicloComponent } from './list/ciclo.component';
import { CicloDetailComponent } from './detail/ciclo-detail.component';
import { CicloUpdateComponent } from './update/ciclo-update.component';
import { CicloDeleteDialogComponent } from './delete/ciclo-delete-dialog.component';
import { CicloRoutingModule } from './route/ciclo-routing.module';

@NgModule({
  imports: [SharedModule, CicloRoutingModule],
  declarations: [CicloComponent, CicloDetailComponent, CicloUpdateComponent, CicloDeleteDialogComponent],
  entryComponents: [CicloDeleteDialogComponent],
})
export class CicloModule {}
