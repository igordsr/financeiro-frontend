import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Action } from '../../enums/action.enum';
import { Taxa } from '../../models/taxa';
import { Transferencia } from '../../models/transferencia';
import { TaxaService } from '../../services/taxa.service';
import { TransferenciaService } from '../../services/transferencia.service';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {
  protected action = Action.CREATE;
  protected transferencia!: Transferencia;
  protected title: string = "Agendar";
  protected form!: FormGroup;
  protected submitted = false;
  protected taxas:Array<Taxa> = [];

  constructor(private taxaService:TaxaService, private transferenciaService: TransferenciaService, private activatedRoute: ActivatedRoute, private router: Router,  private formBuilder: FormBuilder) {
    this.taxaService.list().subscribe(resp  => this.taxas = resp);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.transferencia = new Transferencia()
      const id: string = params.get("id") as string;
      if (id != null) {
        this.action = Action.EDIT
        this.title = "Editar";
        this.transferenciaService.findById(id).subscribe(obj => this.transferencia = obj);
      }
      this.form = this.formBuilder.group({
        contaOrigem: ['', Validators.required,  ],
        contaDestino: ['', Validators.required ],
        valorDaTranferencia: ['', Validators.required,  ],
        dataDaTransferencia: ['', Validators.required ],
      });
    })
  }

  protected get registerFormControl() {
    return this.form.controls;
  }

  protected isFieldValid(field: string):boolean {
    return !(this.form.get(field)?.valid as boolean) && (this.form.get(field)?.touched as boolean);
  }

  protected displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  protected backToThePreviousPage():void{
    let warnning:boolean = this.form.touched;
    if(warnning){
      if(!confirm("Suas Alterações alterações serão perdidas\nDeseja Continuar?")){
        return;
      }
    }
    this.router.navigate(["/"]);
  }

  protected onSubmit():void {
    this.submitted = true;
    if (this.form.valid) {
      switch (this.action) {
        case Action.CREATE:
          this.transferenciaService.create(this.transferencia.toDTO()).subscribe(()=> this.router.navigate(["/"]));
          break;
        case Action.EDIT:
          this.transferenciaService.edit(this.transferencia.id, this.transferencia.toDTO()).subscribe(()=> this.router.navigate(["/"]));
          break;
        default:
          this.router.navigate(["/"]);
          break;
      }
    }
  }

  protected calcularTaxa(){
    if(this.taxas.length){
      if(this.transferencia.dataDaTransferencia && this.transferencia.valorDaTranferencia > 0){
        const dataDaTransferencia = new Date(this.transferencia.dataDaTransferencia);
        const dataDeAgendamento  = new Date(this.transferencia.dataDeAgendamento);
        dataDaTransferencia.setDate(dataDaTransferencia.getDate() + 1)

        const diff = Math.abs(dataDaTransferencia.getTime() - dataDeAgendamento.getTime()); // Subtrai uma data pela outra
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
        const txArr = this.taxas.filter(obj => days >= obj.inicio && days <= obj.fim);
        if(txArr.length == 0){
          alert("O agendamento da tranzação não pode exceder 50 dias");
          const obj:any = null;
          this.transferencia.dataDaTransferencia = (obj) as Date;
          this.transferencia.taxa = 0;
          return;
        }
        const taxa:Taxa = txArr[0];
        this.transferencia.taxa = (this.transferencia.valorDaTranferencia * taxa.aliquota) / 100;
        if(this.transferencia.taxa < taxa.valor){
          this.transferencia.taxa = taxa.valor;
        }
      }
    }
  }
}
