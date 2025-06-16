import { useEffect, useState } from "react";
import "./style.css";

type Endereco = {
  id: number;
  rua: string;
  cidade: string;
  estado: string;
};

type Pessoa = {
  id: number;
  nome: string;
  idade: number;
  enderecoId: number;
  endereco?: Endereco;
};

export default function App() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);

  // Estados Pessoa
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [enderecoId, setEnderecoId] = useState("");

  const [editandoPessoaId, setEditandoPessoaId] = useState<number | null>(null);

  // Estados Endereço
  const [rua, setRua] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const [editandoEnderecoId, setEditandoEnderecoId] = useState<number | null>(
    null
  );

  const [view, setView] = useState<"pessoas" | "enderecos">("pessoas");

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

  const limparCamposPessoa = () => {
    setNome("");
    setIdade("");
    setEnderecoId("");
    setEditandoPessoaId(null);
  };

  // Função para salvar edição de pessoa
  const salvarEdicaoPessoa = () => {
    if (editandoPessoaId === null) {
      alert("Nenhuma pessoa selecionada para edição");
      return;
    }

    if (!nome.trim()) {
      alert("Nome é obrigatório");
      return;
    }

    const idadeNum = Number(idade);
    if (isNaN(idadeNum) || idadeNum <= 0) {
      alert("Idade inválida");
      return;
    }

    const enderecoIdNum = Number(enderecoId);
    if (isNaN(enderecoIdNum) || enderecoIdNum <= 0) {
      alert("Endereço inválido");
      return;
    }

    const pessoaEditada = {
      id: editandoPessoaId,
      nome: nome.trim(),
      idade: idadeNum,
      enderecoId: enderecoIdNum,
    };

    fetch(`${API_PESSOAS}/${editandoPessoaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pessoaEditada),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao editar pessoa");
        return res.json();
      })
      .then((pessoaAtualizada: Pessoa) => {
        setPessoas((prevPessoas) =>
          prevPessoas.map((p) =>
            p.id === pessoaAtualizada.id ? pessoaAtualizada : p
          )
        );
        limparCamposPessoa();
        setView("pessoas");
      })
      .catch((err) => alert(err.message || "Erro ao editar pessoa"));
  };

  // Submit do formulário de pessoa - cria ou edita
  const handleSubmitPessoa = (e: React.FormEvent) => {
    e.preventDefault();

    if (editandoPessoaId) {
      salvarEdicaoPessoa();
      return;
    }

    if (!nome.trim()) {
      alert("Nome é obrigatório");
      return;
    }

    const idadeNum = Number(idade);
    if (isNaN(idadeNum) || idadeNum <= 0) {
      alert("Idade inválida");
      return;
    }

    const enderecoIdNum = Number(enderecoId);
    if (isNaN(enderecoIdNum) || enderecoIdNum <= 0) {
      alert("Endereço inválido");
      return;
    }

    const pessoaNova = {
      nome: nome.trim(),
      idade: idadeNum,
      enderecoId: enderecoIdNum,
    };

    fetch(API_PESSOAS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pessoaNova),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cadastrar pessoa");
        return res.json();
      })
      .then((data) => {
        setPessoas([...pessoas, data]);
        limparCamposPessoa();
      })
      .catch(() => alert("Erro ao cadastrar pessoa"));
  };

  // const prepararEdicaoPessoa = (p: Pessoa) => {
  //   setNome(p.nome);
  //   setIdade(p.idade.toString());
  //   setEnderecoId(p.enderecoId.toString());
  //   setEditandoPessoaId(p.id);
  //   setView("pessoas");
  // };
  const prepararEdicaoPessoa = (p: Pessoa) => {
    setNome(p.nome);
    setIdade(p.idade.toString());
    setEnderecoId(p.enderecoId != null ? p.enderecoId.toString() : "");
    setEditandoPessoaId(p.id);
    setView("pessoas");
  };

  const handleDeletarPessoa = (id: number) => {
    if (!window.confirm("Deseja realmente deletar esta pessoa?")) return;

    fetch(`${API_PESSOAS}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao deletar pessoa");
        return res.json();
      })
      .then(() => setPessoas(pessoas.filter((p) => p.id !== id)))
      .catch(() => alert("Erro ao deletar pessoa"));
  };

  const limparCamposEndereco = () => {
    setRua("");
    setCidade("");
    setEstado("");
    setEditandoEnderecoId(null);
  };

  const handleSubmitEndereco = (e: React.FormEvent) => {
    e.preventDefault();
    const enderecoData = { rua, cidade, estado };

    if (editandoEnderecoId) {
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
        .catch(() => alert("Erro ao atualizar endereço"));
    } else {
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
        .catch(() => alert("Erro ao cadastrar endereço"));
    }
  };

  const prepararEdicaoEndereco = (end: Endereco) => {
    console.log("Endereço recebido:", end);
    setRua(end.rua);
    setCidade(end.cidade);
    setEstado(end.estado); // Confirme que aqui o valor está correto!
    setEditandoEnderecoId(end.id);
    setView("enderecos");
  };

  const handleDeletarEndereco = (id: number) => {
    if (!window.confirm("Deseja realmente deletar este endereço?")) return;

    fetch(`${API_ENDERECOS}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao deletar endereço");
        return res.json();
      })
      .then(() => setEnderecos(enderecos.filter((e) => e.id !== id)))
      .catch(() => alert("Erro ao deletar endereço"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setView("pessoas")}>Pessoas</button>
      <button onClick={() => setView("enderecos")}>Endereços</button>

      {view === "pessoas" && (
        <>
          <h1>{editandoPessoaId ? "Editar Pessoa" : "Cadastro de Pessoas"}</h1>
          <form onSubmit={handleSubmitPessoa}>
            <input
              type="text"
              value={nome}
              placeholder="Nome"
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="number"
              value={idade}
              placeholder="Idade"
              onChange={(e) => setIdade(e.target.value)}
              required
            />
            <select
              value={enderecoId}
              onChange={(e) => setEnderecoId(e.target.value)}
              required
            >
              <option value="">Selecione o Endereço</option>
              {enderecos.map((end) => (
                <option key={end.id} value={end.id}>
                  {end.rua}, {end.cidade} - {end.estado}
                </option>
              ))}
            </select>
            <button type="submit">
              {editandoPessoaId ? "Salvar" : "Cadastrar"}
            </button>
            {editandoPessoaId && (
              <button
                type="button"
                onClick={() => {
                  limparCamposPessoa();
                }}
              >
                Cancelar
              </button>
            )}
          </form>

          <h2>Lista de Pessoas</h2>
          <ul>
            {pessoas.map((p) => (
              <li key={p.id}>
                {p.nome} ({p.idade}) - Endereço ID: {p.enderecoId}{" "}
                <button onClick={() => prepararEdicaoPessoa(p)}>Editar</button>{" "}
                <button onClick={() => handleDeletarPessoa(p.id)}>
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {view === "enderecos" && (
        <>
          <h1>
            {editandoEnderecoId ? "Editar Endereço" : "Cadastro de Endereços"}
          </h1>
          <form onSubmit={handleSubmitEndereco}>
            <input
              type="text"
              value={rua}
              placeholder="Rua"
              onChange={(e) => setRua(e.target.value)}
              required
            />
            <input
              type="text"
              value={cidade}
              placeholder="Cidade"
              onChange={(e) => setCidade(e.target.value)}
              required
            />
            <input
              type="text"
              value={estado}
              placeholder="Estado"
              onChange={(e) => setEstado(e.target.value.trim())}
              required
            />
            <button type="submit">
              {editandoEnderecoId ? "Salvar" : "Cadastrar"}
            </button>
            {editandoEnderecoId && (
              <button
                type="button"
                onClick={() => {
                  limparCamposEndereco();
                }}
              >
                Cancelar
              </button>
            )}
          </form>

          <h2>Lista de Endereços</h2>
          <ul>
            {enderecos.map((end) => (
              <li key={end.id}>
                {end.rua}, {end.cidade} - {end.estado}{" "}
                <button onClick={() => prepararEdicaoEndereco(end)}>
                  Editar
                </button>{" "}
                <button onClick={() => handleDeletarEndereco(end.id)}>
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
