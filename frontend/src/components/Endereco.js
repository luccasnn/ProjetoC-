import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

function Enderecos() {
  const [enderecos, setEnderecos] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/enderecos`)
      .then((res) => res.json())
      .then((data) => setEnderecos(data))
      .catch((err) => console.error("Erro ao buscar endereços:", err));
  }, []);

  return (
    <div>
      <h2>Lista de Endereços</h2>
      <ul>
        {enderecos.map((e) => (
          <li key={e.id}>
            {e.rua}, {e.cidade}, {e.estado} (Pessoa ID: {e.pessoaId})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Enderecos;
