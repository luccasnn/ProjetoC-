# Projeto Full Stack - React + .NET 7.0

Este repositório contém um projeto full stack com **front-end em React 19 + TypeScript 4.9.5** e **back-end em .NET 7.0 com Minimal API** e banco de dados **SQLite**.

---

## 📁 Estrutura do Projeto

ProjetoC-/
├── back/ # Projeto back-end (.NET 7 + SQLite)
└── front/ # Projeto front-end (React + TS 4.9.5)


---

## ✅ Pré-requisitos

Certifique-se de ter as seguintes versões instaladas:

### 🧰 Ferramentas necessárias

| Ferramenta         | Versão mínima recomendada         |
|--------------------|-----------------------------------|
| [.NET SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)       | 7.0.x                            |
| [Node.js](https://nodejs.org/)                        | 16.x ou superior                |
| [npm](https://www.npmjs.com/)                         | 8.x ou superior                 |
| [Git](https://git-scm.com/)                           | Qualquer versão                 |
| [Visual Studio Code](https://code.visualstudio.com/)  | (opcional, mas recomendado)     |

---

## 🚀 Como Executar o Projeto

### 🔄 Clonar o repositório

git bash ->
git clone https://github.com/luccasnn/ProjetoC-.git
cd ProjetoC-
🖥️ Instruções para executar o Back-end (API - .NET 7.0)

1. Acessar a pasta do back-end
git bash ->

cd back

2. Restaurar os pacotes e compilar
bash ->

dotnet restore
dotnet build

3. Instalar Entity Framework CLI (caso ainda não tenha)
bash ->

dotnet tool install --global dotnet-ef --version 7.0

4. Aplicar as migrações (caso necessário)
bash ->

dotnet ef database update

5. Executar o servidor
bash->

dotnet run

🔗 O servidor será iniciado na porta: http://localhost:5128

🛠 Dependências utilizadas

Microsoft.EntityFrameworkCore

Microsoft.EntityFrameworkCore.Sqlite

Microsoft.EntityFrameworkCore.Tools

Swashbuckle.AspNetCore (para Swagger)

⚠️ Observação importante:
O projeto usa SQLite como banco real.

🌐 Instruções para executar o Front-end (React 19 + TypeScript)
1. Acessar a pasta do front-end
bash ->

cd ../front

2. Instalar as dependências do projeto
bash ->

npm install

⚠️ O projeto exige TypeScript 4.9.5, que será instalado via devDependencies.

3. Iniciar a aplicação React
bash->

npm start
🔗 A aplicação será acessível no navegador via:
http://localhost:3000

🌉 Conectando Front-end com Back-end
O front-end já está configurado para consumir a API hospedada localmente em:

http://localhost:5128
Verifique se o back-end está rodando antes de acessar o front-end.

📦 Tecnologias utilizadas
🔧 Back-end
.NET 7.0 (Minimal API)

Entity Framework Core 7.0

SQLite


💻 Front-end

React 19

TypeScript 4.9.5

Axios

Material UI (MUI)

React Scripts

🧪 Testes e Build

Rodar testes front-end (opcional)
bash ->

npm test

Gerar build de produção
bash->

npm run build

📝 Observações Finais

O projeto é executado localmente e não depende de variáveis de ambiente .env.

As portas podem ser alteradas conforme necessidade nos arquivos launchSettings.json (back-end) ou scripts do React (package.json).
