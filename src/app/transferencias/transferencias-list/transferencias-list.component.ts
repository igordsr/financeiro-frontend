import { Component } from '@angular/core';

import { Action } from '../../enums/action.enum';
import { Transferencia } from '../../models/transferencia';
import { ToastService } from '../../services/toast.service';
import { TransferenciaService } from '../../services/transferencia.service';

@Component({
  selector: 'app-transferencias-list',
  templateUrl: './transferencias-list.component.html',
  styleUrls: ['./transferencias-list.component.css']
})
export class TransferenciasListComponent {
  protected readonly action = Action;
  protected transferencias: Array<Transferencia> = [];
  protected modalTitle: string = "Cadastro de Tarefa";
  protected transferenciaselecionada: Transferencia = new Transferencia();
  protected alertVisible: boolean = false;

  constructor(private transferenciaService: TransferenciaService, private _toastService: ToastService) {
    this.loadList();
  }

  private loadList() {
    this.transferenciaService.list().subscribe(result => {
      this.transferencias = result;
    })
  }

  protected submitEvent(event: Action, tarefaClicked?: Transferencia): void {
    switch (event) {
      case Action.DELETE:
        if (tarefaClicked) {
          if (confirm("Tem certeza que Deseja exluir o Registro?")) {
            this.transferenciaService.delete(tarefaClicked.id).subscribe(() => {
              this.loadList();
            });
          }
        }
        break;
      case Action.LIST:
        this.loadList();
        break;
      default:
        break;
    }
  }
}
