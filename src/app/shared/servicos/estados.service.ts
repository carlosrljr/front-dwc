import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cidade } from './interfaces/cidades';

const URL = 'http://localhost:3000/cidades'

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  constructor(private http:HttpClient) { }

  retornaEstado(id:string):Observable<Cidade>{
    return this.http.get<Cidade>( `${URL}/${id}` )
  }
}
