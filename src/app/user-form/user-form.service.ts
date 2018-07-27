import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserFormService {

  URL: 'https://www.improving.com.br/api/test/users';

  constructor(private http: HttpClient) { }

  cadastrarUsuarioImproving(user): Observable<any> {
    return this.http.post(this.URL, user);
  }
}
