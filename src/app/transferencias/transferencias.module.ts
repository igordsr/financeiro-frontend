import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { TransferenciaComponent } from './transferencia/transferencia.component';
import { TransferenciasListComponent } from './transferencias-list/transferencias-list.component';
import { TransferenciasRoutingModule } from './transferencias-routing.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    TransferenciasListComponent,
    TransferenciaComponent
  ],
  imports: [
    CommonModule,
    TransferenciasRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    SharedModule
  ]
})
export class TransferenciasModule { }
