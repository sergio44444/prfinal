import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'alumno',
        data: { pageTitle: 'proyectoTfc1App.alumno.home.title' },
        loadChildren: () => import('./alumno/alumno.module').then(m => m.AlumnoModule),
      },
      {
        path: 'tutor',
        data: { pageTitle: 'proyectoTfc1App.tutor.home.title' },
        loadChildren: () => import('./tutor/tutor.module').then(m => m.TutorModule),
      },
      {
        path: 'director',
        data: { pageTitle: 'proyectoTfc1App.director.home.title' },
        loadChildren: () => import('./director/director.module').then(m => m.DirectorModule),
      },
      {
        path: 'ciclo',
        data: { pageTitle: 'proyectoTfc1App.ciclo.home.title' },
        loadChildren: () => import('./ciclo/ciclo.module').then(m => m.CicloModule),
      },
      {
        path: 'centro',
        data: { pageTitle: 'proyectoTfc1App.centro.home.title' },
        loadChildren: () => import('./centro/centro.module').then(m => m.CentroModule),
      },
      {
        path: 'empresa',
        data: { pageTitle: 'proyectoTfc1App.empresa.home.title' },
        loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
