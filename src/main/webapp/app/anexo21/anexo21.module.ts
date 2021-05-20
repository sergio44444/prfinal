import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ANEXO21_ROUTE } from './anexo21.route';

@NgModule({
  declarations: [],
  imports: [SharedModule, RouterModule.forChild([ANEXO21_ROUTE])],
})
export class Anexo21Module {}
