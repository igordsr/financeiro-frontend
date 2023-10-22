import { ToDto } from "../dtos/to-dto";

export class Transferencia implements ToDto{
  private _id!: string;
  private _contaOrigem!: string;
  private _contaDestino!: string;
  private _valorDaTranferencia!: number;
  private _taxa: number;
  private _dataDaTransferencia!: Date;
  private _dataDeAgendamento: Date;

  constructor() {
    this._taxa = 0;
    const today = new Date();
    today.setDate(today.getDate() + 1)
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const st = `${yyyy}-${mm}-${dd}`
    this._dataDeAgendamento = new Date(st);
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get contaOrigem(): string {
    return this._contaOrigem;
  }
  public set contaOrigem(value: string) {
    this._contaOrigem = value;
  }

  public get contaDestino(): string {
    return this._contaDestino;
  }
  public set contaDestino(value: string) {
    this._contaDestino = value;
  }

  public get valorDaTranferencia(): number {
    return this._valorDaTranferencia;
  }
  public set valorDaTranferencia(value: number) {
    this._valorDaTranferencia = value;
  }

  public get taxa(): number {
    return this._taxa;
  }
  public set taxa(value: number) {
    this._taxa = value;
  }

  public get dataDaTransferencia(): Date {
    return this._dataDaTransferencia;
  }
  public set dataDaTransferencia(value: Date) {
    this._dataDaTransferencia = value;
  }

  public get dataDeAgendamento(): Date {
    return this._dataDeAgendamento;
  }
  public set dataDeAgendamento(value: Date) {
    this._dataDeAgendamento = value;
  }

  toDTO<TransferenciaDto>(): TransferenciaDto {
    return {
      contaOrigem: this._contaOrigem,
      contaDestino: this._contaDestino,
      valorDaTranferencia: this._valorDaTranferencia,
      dataDaTransferencia: this._dataDaTransferencia
    } as TransferenciaDto
  }

}
