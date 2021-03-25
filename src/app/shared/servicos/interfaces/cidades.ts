export interface Cidade {
	id: string;
	nome: string;
	estado: string;
}

export type Cidades = Array<Cidade>

export interface cidadesApi {
	items: Cidade[];
	hasNext: boolean;
}
