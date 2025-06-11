import React, { useState, useEffect } from "react";

function App() {
  const [view, setView] = useState("pessoas");
  const [pessoas, setPessoas] = useState([]);
  const [enderecos, setEnderecos] = useState([]);

  // Estados para pessoas
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [enderecoId, setEnderecoId] = useState("");

  // Estados para endereços
  const [rua, setRua] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  // Estados para edição
  const [editandoPessoaId, setEditandoPessoaId] = useState(null);
  const [editandoEnderecoId, setEditandoEnderecoId] = useState(null);

  const API_PESSOAS = "http://localhost:5128/api/pessoas";
  const API_ENDERECOS = "http://localhost:5128/api/enderecos";

  useEffect(() => {
    fetchPessoas();
    fetchEnderecos();
  }, []);

  const fetchPessoas = () => {
    fetch(API_PESSOAS)
      .then((res) => res.json())
      .then((data) => setPessoas(data))
      .catch((err) => console.error("Erro ao buscar pessoas:", err));
  };

  const fetchEnderecos = () => {
    fetch(API_ENDERECOS)
      .then((res) => res.json())
      .then((data) => setEnderecos(data))
      .catch((err) => console.error("Erro ao buscar endereços:", err));
  };

  // --- Pessoa ---

  const limparCamposPessoa = () => {
    setNome("");
    setIdade("");
    setEnderecoId("");
    setEditandoPessoaId(null);
  };

  const handleSubmitPessoa = (e) => {
    e.preventDefault();

    const pessoaData = {
      nome,
      idade: parseInt(idade),
      enderecoId: parseInt(enderecoId),
    };

    if (editandoPessoaId) {
      // Atualizar (PUT)
      fetch(`${API_PESSOAS}/${editandoPessoaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pessoaData),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao atualizar pessoa");
          return res.json();
        })
        .then(() => {
          fetchPessoas();
          limparCamposPessoa();
        })
        .catch((err) => {
          console.error(err);
          alert("Erro ao atualizar pessoa");
        });
    } else {
      // Cadastrar (POST)
      fetch(API_PESSOAS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pessoaData),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao cadastrar pessoa");
          return res.json();
        })
        .then((data) => {
          setPessoas([...pessoas, data]);
          limparCamposPessoa();
        })
        .catch((err) => {
          console.error(err);
          alert("Erro ao cadastrar pessoa");
        });
    }
  };

  const prepararEdicaoPessoa = (pessoa) => {
    setNome(pessoa.nome);
    setIdade(pessoa.idade.toString());
    setEnderecoId(pessoa.enderecoId ? pessoa.enderecoId.toString() : "");
    setEditandoPessoaId(pessoa.id);
    setView("pessoas");
  };

  const handleDeletarPessoa = (id) => {
    if (!window.confirm("Deseja realmente deletar esta pessoa?")) return;

    fetch(`${API_PESSOAS}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao deletar pessoa");
        setPessoas(pessoas.filter((p) => p.id !== id));
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao deletar pessoa");
      });
  };

  // --- Endereço ---

  const limparCamposEndereco = () => {
    setRua("");
    setCidade("");
    setEstado("");
    setEditandoEnderecoId(null);
  };

  const handleSubmitEndereco = (e) => {
    e.preventDefault();

    const enderecoData = { rua, cidade, estado };

    if (editandoEnderecoId) {
      // Atualizar (PUT)
      fetch(`${API_ENDERECOS}/${editandoEnderecoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enderecoData),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao atualizar endereço");
          return res.json();
        })
        .then(() => {
          fetchEnderecos();
          limparCamposEndereco();
        })
        .catch((err) => {
          console.error(err);
          alert("Erro ao atualizar endereço");
        });
    } else {
      // Cadastrar (POST)
      fetch(API_ENDERECOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enderecoData),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao cadastrar endereço");
          return res.json();
        })
        .then((data) => {
          setEnderecos([...enderecos, data]);
          limparCamposEndereco();
        })
        .catch((err) => {
          console.error(err);
          alert("Erro ao cadastrar endereço");
        });
    }
  };

  const prepararEdicaoEndereco = (endereco) => {
    setRua(endereco.rua);
    setCidade(endereco.cidade);
    setEstado(endereco.estado);
    setEditandoEnderecoId(endereco.id);
    setView("enderecos");
  };

  const handleDeletarEndereco = (id) => {
    if (!window.confirm("Deseja realmente deletar este endereço?")) return;

    fetch(`${API_ENDERECOS}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao deletar endereço");
        setEnderecos(enderecos.filter((end) => end.id !== id));
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao deletar endereço");
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
          <h1>{editandoPessoaId ? "Editar Pessoa" : "Cadastro de Pessoas"}</h1>
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
            <button type="submit">
              {editandoPessoaId ? "Atualizar" : "Cadastrar"}
            </button>
            {editandoPessoaId && (
              <button
                type="button"
                onClick={limparCamposPessoa}
                style={{ marginLeft: "10px" }}
              >
                Cancelar
              </button>
            )}
          </form>

          <section>
            <h2>Pessoas cadastradas:</h2>
            <ul>
              {pessoas.map((p) => (
                <li key={p.id}>
                  {p.nome}, {p.idade} anos – Endereço:{" "}
                  {p.endereco
                    ? `${p.endereco.rua}, ${p.endereco.cidade} - ${p.endereco.estado}`
                    : "Sem endereço"}{" "}
                  <button onClick={() => prepararEdicaoPessoa(p)}>
                    Editar
                  </button>{" "}
                  <button onClick={() => handleDeletarPessoa(p.id)}>
                    Deletar
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {view === "enderecos" && (
        <>
          <h2>
            {editandoEnderecoId ? "Editar Endereço" : "Cadastro de Endereços"}
          </h2>
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
            <button type="submit">
              {editandoEnderecoId ? "Atualizar" : "Cadastrar"}
            </button>
            {editandoEnderecoId && (
              <button
                type="button"
                onClick={limparCamposEndereco}
                style={{ marginLeft: "10px" }}
              >
                Cancelar
              </button>
            )}
          </form>

          <h3>Endereços cadastrados:</h3>
          <ul>
            {enderecos.map((end) => (
              <li key={end.id}>
                {end.rua}, {end.cidade} - {end.estado}{" "}
                <button onClick={() => prepararEdicaoEndereco(end)}>
                  Editar
                </button>{" "}
                <button onClick={() => handleDeletarEndereco(end.id)}>
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

export default App;
