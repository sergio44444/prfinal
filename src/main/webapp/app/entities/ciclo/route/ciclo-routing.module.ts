import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CicloComponent } from '../list/ciclo.component';
import { CicloDetailComponent } from '../detail/ciclo-detail.component';
import { CicloUpdateComponent } from '../update/ciclo-update.component';
import { CicloRoutingResolveService } from './ciclo-routing-resolve.service';

const cicloRoute: Routes = [
  {
    path: '',
    component: CicloComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CicloDetailComponent,
    resolve: {
      ciclo: CicloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CicloUpdateComponent,
    resolve: {
      ciclo: CicloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CicloUpdateComponent,
    resolve: {
      ciclo: CicloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cicloRoute)],
  exports: [RouterModule],
})
export class CicloRoutingModule {}
