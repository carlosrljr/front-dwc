import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoSelectOption } from '@po-ui/ng-components';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CidadesService } from 'src/app/shared/servicos/cidades.service';
import { EstadosService } from 'src/app/shared/servicos/estados.service';
import { ClientesService } from '../clientes.service';
import { Cliente } from '../models/clientes';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.css']
})
export class FormularioClienteComponent implements OnInit {
  title: string;
  breadcrumb: PoBreadcrumb = {
    items: [{label: 'Home'}, {label: "Client"}]
  };
  clienteForm: FormGroup;
  sexOpt:Array<PoSelectOption> = [
    {label: 'Masculino', value: 'M'},
    {label: 'Feminino', value: 'F'},
    {label: 'Prefiro não informar', value: 'P'}
  ];
  estadoOpt:Array<PoSelectOption> = [];
  cidadeOpt:Array<PoSelectOption> = [];

  altera = false;


  constructor(
    private clienteService: ClientesService,
    private estadoService: EstadosService,
    private cidadeService: CidadesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.configuraFormulario();
    this.configuraEstado();
    this.configuraCliente();
  }

  private configuraCliente(){
    this.activatedRoute.params.pipe(
      switchMap((param)=>{
        const { id } = param;
        if (id) {
          this.altera = true;
          return this.clienteService.retornaCliente(id);
        }
        return of({} as Cliente)
      })
    )
    .subscribe((cliente)=>{
      if (cliente) {
        this.title = `Editando Cliente ${cliente.nome}`;
        this.clienteForm.setValue(cliente)
      }
      this.title = "Novo Cliente"
    })
  }

  private configuraFormulario(): void{
    this.clienteForm = this.formBuilder.group({
      id:[''],
      nome:['',[Validators.required]],
      sexo:[''],
      dataNascimento:[''],
      endereco:[''],
      estado:[''],
      cidade:['']
    })
  }

  private configuraEstado(): void{
    this.estadoService
    .retornaEstados()
    .pipe(
      map((estados) =>
        estados.map((estado) =>
        ({label: estado.nome, value:estado.id }))
      )
    )
  }

  save(){}

  cancel(){}

}
