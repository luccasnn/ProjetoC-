import { Endereco } from "./Endereco";

export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  enderecoId?: number;
  endereco?: Endereco;
}
