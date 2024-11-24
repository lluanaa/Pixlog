# Sistema de Controle de Empresas Parceiras da Pixlog

Este projeto é um sistema desenvolvido como parte de um teste técnico, que tem como objetivo gerenciar **empresas**, **operadores** e **relatórios de medição**.

## Tecnologias Utilizadas
- Node.js
- PostgreSQL
- Sequelize

## 🚀 Funcionalidades Implementadas

### Empresas
- **Cadastrar Empresa**  
  Criação de empresas com validação de CNPJ e e-mail.
- **Editar Empresa**  
  Campos editáveis e obrigatórios.
- **Deletar Empresa**  
  Permite excluir uma empresa existente.
- **Listar Empresas**  
  Retorna a lista de empresas ou uma empresa específica.

### Operadores
- **Cadastrar Operador**  
  Criação de operadores com os seguintes campos: nome, cargo, empresa associada (opcional), e-mail e telefone.
- **Editar Operador**  
  Todos os campos são editáveis, incluindo a empresa associada.
- **Deletar Operador**  
  Remove um operador existente.
- **Listar Operadores**  
  Retorna a lista de operadores ou um operador específico.

### Relatórios de Medição
- **Criar Relatório**  
  Geração de relatórios com campos obrigatórios e opcionais.
- **Arquivar/Desarquivar Relatório**  
  Atualiza o status de arquivado ou não arquivado.
- **Listar Relatórios**  
  Permite listar relatórios com filtros (por operador, empresa, data e status) e paginação.

---

## ✅ Testes Realizados

### Parte das Empresas:
- ✅ **Criação, edição, exclusão e listagem funcionam corretamente.**
- ✅ **Validação de CNPJ e e-mail implementada.**
- ✅ **Retorna lista de empresas ou uma empresa específica.**
- ✅ **Não permite a criação de duas empresas com o mesmo nome.**

### Parte dos Operadores:
- ✅ **Criação, edição, exclusão e listagem de operadores funcionam corretamente.**
- ✅ **Permite associar e alterar empresas.**
- ✅ **Permite nomes ou e-mails repetidos.**
- ✅ **Busca retorna tanto o ID quanto o nome da empresa associada.**

### Parte dos Relatórios:
- ✅ **Criação, edição, arquivamento/desarquivamento funcionam corretamente.**
- ✅ **Filtros e paginação implementados.**
- ✅ **Campos opcionais configurados como "null" quando não preenchidos.**
- ✅ **Filtros retornam corretamente ou uma mensagem caso não haja resultados.**

---

## 📝 Como Rodar o Projeto Localmente

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/lluanaa/Pixlog.git
   ```
2. **Instale as dependências**:
   ```bash
   npm install
   ```
3. **Configure o banco de dados**:
   - Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
     ```env
     DATABASE_URL=postgresql://postgres:VGZCqCMbEKDzxYEfbPvgdEOJrHJplkQy@junction.proxy.rlwy.net:50477/railway
     ```
4. **Execute as migrações do banco**:
   ```bash
   npx sequelize-cli db:migrate
   ```
5. **Inicie o servidor**:
   ```bash
   npm start ou npm run dev
   ```

---

## 🌐 Banco de Dados Online

O sistema está conectado a um banco PostgreSQL hospedado no Railway. Para testar diretamente, você pode usar a URL:

```plaintext
postgresql://postgres:VGZCqCMbEKDzxYEfbPvgdEOJrHJplkQy@junction.proxy.rlwy.net:50477/railway
```

---

## 📂 Estrutura do Projeto

```plaintext
pixlog-partners-system/
├── config/
│   ├── config.json
│   ├── database.js   # Configuração do banco de dados
├── controllers/
│   ├── empresaController.js
│   ├── operatodorController.js
│   ├── relatoriosController.js
├── models/
│   ├── Empresa.js
│   ├── Operador.js
│   ├── Relatorios.js
├── routes/
│   ├── empresaRoutes.js
│   ├── operadorRoutes.js
│   ├── relatoriosRoutes.js
├── .env               # Exemplo do arquivo de configuração
├── package.json       # Dependências e scripts
├── README.md          # Documentação
└── server.js          # Arquivo principal do servidor
```
