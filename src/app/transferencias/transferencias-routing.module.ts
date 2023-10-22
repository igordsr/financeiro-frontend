import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransferenciasListComponent } from './transferencias-list/transferencias-list.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';

const routes: Routes = [
  {
    path: '',
    component: TransferenciasListComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' }
    ]
  },
  {
    path: 'create',
    pathMatch: "full",
    component: TransferenciaComponent
  },
  {
    path: ':id/edit',
    pathMatch: "full",
    component: TransferenciaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferenciasRoutingModule { }
