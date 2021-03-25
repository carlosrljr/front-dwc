export interface Estado {
	id: string;
	sigla: string;
	nome: string;
}

export type Estados = Array<Estado>

export interface estadoApi {
	items: Estado[];
	hasNext: boolean;
}
