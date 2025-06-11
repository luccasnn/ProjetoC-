// import React, { useState, useEffect } from "react";

// function App() {
//   const [pessoas, setPessoas] = useState([]);
//   const [nome, setNome] = useState("");
//   const [idade, setIdade] = useState("");
//   const [email, setEmail] = useState("");
//   const [cidade, setCidade] = useState("");

//   const API_URL = "http://localhost:5000/api/pessoas";

//   // Buscar pessoas na API
//   useEffect(() => {
//     fetch(API_URL)
//       .then((res) => res.json())
//       .then((data) => setPessoas(data))
//       .catch((err) => console.error("Erro ao buscar pessoas:", err));
//   }, []);

//   // Cadastrar nova pessoa
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const novaPessoa = { nome, idade: parseInt(idade), email, cidade };

//     fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(novaPessoa),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setPessoas([...pessoas, data]);
//         setNome("");
//         setIdade("");
//         setEmail("");
//         setCidade("");
//       })
//       .catch((err) => console.error("Erro ao cadastrar:", err));
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Cadastro de Pessoas</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Nome"
//           value={nome}
//           onChange={(e) => setNome(e.target.value)}
//           required
//         />
//         <br />
//         <input
//           type="number"
//           placeholder="Idade"
//           value={idade}
//           onChange={(e) => setIdade(e.target.value)}
//           required
//         />
//         <br />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <br />
//         <input
//           type="text"
//           placeholder="Cidade"
//           value={cidade}
//           onChange={(e) => setCidade(e.target.value)}
//           required
//         />
//         <br />
//         <button type="submit">Cadastrar</button>
//       </form>

//       <h2>Pessoas cadastradas:</h2>
//       <ul>
//         {pessoas.map((p) => (
//           <li key={p.id}>
//             {p.nome}, {p.idade} anos, {p.email}, {p.cidade}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";

function App() {
  const [pessoas, setPessoas] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [enderecoId, setEnderecoId] = useState("");

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

  const handleSubmit = (e) => {
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cadastro de Pessoas</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <br />
        <input
          type="number"
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          required
        />
        <br />
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
        <br />
        <button type="submit">Cadastrar</button>
      </form>

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
    </div>
  );
}

export default App;
