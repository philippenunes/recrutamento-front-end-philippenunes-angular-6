import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CepService {

  constructor(private http: HttpClient) { }

  buscaCEP(cep): Observable<any> {
    return this.http.get('https://viacep.com.br/ws/' + cep + '/json/');
  }
}
