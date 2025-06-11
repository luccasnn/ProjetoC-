import React, { useState, useEffect } from "react";

function App() {
  const [view, setView] = useState("pessoas");
  const [pessoas, setPessoas] = useState([]);
  const [enderecos, setEnderecos] = useState([]);

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [enderecoId, setEnderecoId] = useState("");

  const [rua, setRua] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const API_PESSOAS = "http://localhost:5128/api/pessoas";
  const API_ENDERECOS = "http://localhost:5128/api/enderecos";

  useEffect(() => {
    fetch(API_PESSOAS)
      .then((res) => res.json())
      .then((data) => setPessoas(data))
      .catch((err) => console.error("Erro ao buscar pessoas:", err));

    fetch(API_ENDERECOS)
      .then((res) => res.json())
      .then((data) => setEnderecos(data))
      .catch((err) => console.error("Erro ao buscar endereços:", err));
  }, []);

  const handleSubmitPessoa = (e) => {
    e.preventDefault();

    const novaPessoa = {
      nome,
      idade: parseInt(idade),
      enderecoId: parseInt(enderecoId),
    };

    fetch(API_PESSOAS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaPessoa),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro na requisição");
        return res.json();
      })
      .then((data) => {
        setPessoas([...pessoas, data]);
        setNome("");
        setIdade("");
        setEnderecoId("");
      })
      .catch((err) => {
        console.error("Erro ao cadastrar:", err);
        alert("Erro ao cadastrar. Verifique os campos e a API.");
      });
  };

  const handleSubmitEndereco = (e) => {
    e.preventDefault();

    const novoEndereco = { rua, cidade, estado };

    fetch(API_ENDERECOS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoEndereco),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cadastrar endereço");
        return res.json();
      })
      .then((data) => {
        setEnderecos([...enderecos, data]);
        setRua("");
        setCidade("");
        setEstado("");
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao cadastrar endereço");
      });
  };

  return (
    <main className="container" style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setView("pessoas")}>Gerenciar Pessoas</button>
        <button onClick={() => setView("enderecos")}>
          Gerenciar Endereços
        </button>
      </div>

      {view === "pessoas" && (
        <>
          <h1>Cadastro de Pessoas</h1>
          <form onSubmit={handleSubmitPessoa} className="formulario">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              required
            />
            <select
              value={enderecoId}
              onChange={(e) => setEnderecoId(e.target.value)}
              required
            >
              <option value="">Selecione um endereço</option>
              {enderecos.map((end) => (
                <option key={end.id} value={end.id}>
                  {end.rua}, {end.cidade} - {end.estado}
                </option>
              ))}
            </select>
            <button type="submit">Cadastrar</button>
          </form>

          <section>
            <h2>Pessoas cadastradas:</h2>
            <ul>
              {pessoas.map((p) => (
                <li key={p.id}>
                  {p.nome}, {p.idade} anos – Endereço:{" "}
                  {p.endereco
                    ? `${p.endereco.rua}, ${p.endereco.cidade} - ${p.endereco.estado}`
                    : "Sem endereço"}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {view === "enderecos" && (
        <>
          <h2>Cadastro de Endereços</h2>
          <form onSubmit={handleSubmitEndereco} className="formulario">
            <input
              type="text"
              placeholder="Rua"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
            />
            <button type="submit">Cadastrar Endereço</button>
          </form>

          <h3>Endereços cadastrados:</h3>
          <ul>
            {enderecos.map((end) => (
              <li key={end.id}>
                {end.rua}, {end.cidade} - {end.estado}
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

export default App;
