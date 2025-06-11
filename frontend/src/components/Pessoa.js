import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000"; // ajuste se sua API for diferente

function Pessoas() {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/pessoas`)
      .then((res) => res.json())
      .then((data) => setPessoas(data))
      .catch((err) => console.error("Erro ao buscar pessoas:", err));
  }, []);

  return (
    <div>
      <h2>Lista de Pessoas</h2>
      <ul>
        {pessoas.map((p) => (
          <li key={p.id}>
            {p.nome}, {p.idade} anos
            {p.endereco && (
              <div>
                Endereço: {p.endereco.logradouro}, {p.endereco.cidade}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pessoas;
