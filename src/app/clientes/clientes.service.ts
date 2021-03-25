import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Cliente, Clientes, ClientesAPI } from './models/clientes';
import { map, pluck, switchMap } from 'rxjs/operators';
import { CidadesService } from '../shared/servicos/cidades.service';
import { EstadosService } from '../shared/servicos/estados.service';

const URL = 'http://localhost:3000/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http:HttpClient, private cidadesService:CidadesService, private estadosService:EstadosService) { }

  retornaClientes():Observable<Clientes> {
    return this.http
    .get<ClientesAPI>(URL)
    .pipe(pluck('items'))
  }

  retornaCliente(id:string):Observable<Cliente>{
    return this.http.get<Cliente>(`${URL}/${id}`)
  }

  retornaClienteComEnderecoCompleto(id:string):Observable<Cliente>{
    return this.retornaCliente(id).pipe(
      switchMap((cliente)=>
        forkJoin({
          cliente: of(cliente),
          cidade: this.cidadesService.retornaCidade(cliente.cidade),
          estado: this.estadosService.retornaEstado(cliente.estado)
        })
      ),map((retornoFork)=>{
        return {...retornoFork.cliente, cidade:retornoFork.cidade.nome, estado:retornoFork.estado.nome};
      })
    )
  }

  apagaCliente(id:string):Observable<Cliente>{
    return this.http.delete<Cliente>(`${URL}/${id}`)
  }
}
