import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Taxa } from '../models/taxa';

@Injectable({
  providedIn: 'root'
})
export class TaxaService {
  private URI: string = environment.BASE_URL

  constructor(private httpClient: HttpClient) {

  }

  public list(): Observable<Array<Taxa>> {
    return this.httpClient.get(`${this.URI}/taxa`).pipe(map(resp =>{
      const taxas:Array<Taxa> = resp as Array<Taxa>
      return taxas
    }));
  }
}
