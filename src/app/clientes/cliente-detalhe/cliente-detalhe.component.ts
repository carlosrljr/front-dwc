import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ClientesService } from '../clientes.service';
import { Cliente } from '../models/clientes';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.css']
})
export class ClienteDetalheComponent implements OnInit {
  cliente: Cliente;
  titulo:string;

  constructor(private clienteService:ClientesService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params)=>this.clienteService.retornaCliente(params.id))
    ).subscribe(
      (cliente)=>{
        this.cliente = cliente
      }
    )
  }

  get sexo():string{
    const sexoOpt = {
      M: "Masculino",
      F: "Feminino",
      P: "Prefiro não informar"
    };
    return sexoOpt[this.cliente.sexo] ?? sexoOpt.P
  }

  voltar(){

  };

  remover(){

  };

  editar(){

  };

}
