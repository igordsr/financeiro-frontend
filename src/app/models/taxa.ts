export class Taxa {
  private _inicio!: number;
  private _fim!: number;
  private _valor!: number;
  private _aliquota!: number;

  public get inicio(): number {
    return this._inicio;
  }
  public set inicio(value: number) {
    this._inicio = value;
  }

  public get fim(): number {
    return this._fim;
  }
  public set fim(value: number) {
    this._fim = value;
  }

  public get valor(): number {
    return this._valor;
  }
  public set valor(value: number) {
    this._valor = value;
  }

  public get aliquota(): number {
    return this._aliquota;
  }
  public set aliquota(value: number) {
    this._aliquota = value;
  }

}
