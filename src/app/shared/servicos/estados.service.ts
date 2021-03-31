import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Estado, estadoApi, Estados } from './interfaces/estados';

const URL = 'http://localhost:3000/estados'

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  constructor(private http:HttpClient) { }

  retornaEstado(id:string):Observable<Estado>{
    return this.http.get<Estado>( `${URL}/${id}` )
  }

  retornaEstados():Observable<Estados>{
    return this.http.get<estadoApi>(`${URL}`).pipe(pluck('items'))
  }
}
