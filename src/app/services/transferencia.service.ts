import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Transferencia } from '../models/transferencia';
import { TransferenciaDto } from '../dtos/transferencia-dto';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {
  private URI: string = environment.BASE_URL

  constructor(private httpClient: HttpClient) {

  }

  public findById(id: string):Observable<Transferencia> {
    return this.httpClient.get(`${this.URI}/agendamento-transferencia/${id}`).pipe(map(resp =>{
      const transferencia:Transferencia = new Transferencia();
      let response:any = resp as Object;
      transferencia.id = response.id;
      transferencia.contaOrigem = response.contaOrigem;
      transferencia.contaDestino = response.contaDestino;
      transferencia.valorDaTranferencia = response.valorDaTranferencia
      transferencia.taxa = response.taxa
      transferencia.dataDaTransferencia = new Date(response.dataDaTransferencia);
      transferencia.dataDeAgendamento = new Date(response.dataDeAgendamento);
      return transferencia;
    }));
  }

  public list(): Observable<Array<Transferencia>> {
    return this.httpClient.get(`${this.URI}/agendamento-transferencia`).pipe(map(resp =>{
      const transferencias:Array<any> = resp as Array<any>
      const tarefas:Array<Transferencia> = transferencias.map(response =>{
        const transferencia:Transferencia = new Transferencia();
        transferencia.id = response.id;
        transferencia.contaOrigem = response.contaOrigem;
        transferencia.contaDestino = response.contaDestino;
        transferencia.valorDaTranferencia = response.valorDaTranferencia
        transferencia.taxa = response.taxa
        transferencia.dataDaTransferencia = response.dataDaTransferencia
        transferencia.dataDeAgendamento = response.dataDeAgendamento
        return transferencia;
      });
      return tarefas
    }));
  }
  create(arg0: TransferenciaDto): Observable<any> {
    return this.httpClient.post<any>(`${this.URI}/agendamento-transferencia`, arg0);
  }

  edit(id: string, arg0: TransferenciaDto): Observable<any> {
    return this.httpClient.put(`${this.URI}/agendamento-transferencia/${id}`, arg0);
  }

  delete(id: string):Observable<any> {
    return this.httpClient.delete(`${this.URI}/agendamento-transferencia/${id}`);
  }

}
