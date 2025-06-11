// src/components/PessoaList.tsx
import { useEffect, useState } from "react";
import api from "../api/api";
import { Pessoa } from "../types/Pessoa";

export function PessoaList() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  useEffect(() => {
    api.get("/pessoas").then((res) => {
      setPessoas(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Lista de Pessoas</h2>
      <ul>
        {pessoas.map((pessoa) => (
          <li key={pessoa.id}>
            <strong>{pessoa.nome}</strong> — {pessoa.idade} anos
            {pessoa.endereco ? (
              <div>
                Endereço: {pessoa.endereco.rua}, {pessoa.endereco.cidade} -{" "}
                {pessoa.endereco.estado}
              </div>
            ) : (
              <div>Sem endereço</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
