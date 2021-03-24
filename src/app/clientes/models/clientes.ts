export interface ClientesAPI {
    items: Clientes;
    hasNext: boolean
};

export type Clientes = Array<Cliente>;

export interface Cliente {
	id: string;
	nome: string;
	endereco: string;
	cidade: string;
	estado: string;
	sexo: string;
	dataNascimento: string;
}
