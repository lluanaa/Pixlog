# Sistema de Controle de Empresas Parceiras da Pixlog

Este projeto é um sistema desenvolvido como parte de um teste técnico, que tem como objetivo gerenciar **empresas**, **operadores** e **relatórios de medição**.

## Tecnologias Utilizadas
- Node.js
- PostgreSQL
- Sequelize

## Funcionalidades Implementadas

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

## Testes realizados:

## Parte das empresas:

- ✅ **Empresa é criada** (permite criar apenas uma empresa por vez)
- ✅ **Empresa é atualizada**
- ✅ **Empresa é excluída**
- ✅ **Empresa é encontrada**
- ✅ **Depois de deletado, ele não encontra mais a empresa**
- ✅ **Cada empresa tem um id único**
- ✅ **Cada empresa tem um validador de CNPJ e e-mail**
- ✅ **Retorna tanto uma empresa, quanto a lista de empresas, caso tenha mais de uma**
- ✅ **Deixa cadastrar empresas com CNPJ incluindo caracteres especiais. Por exemplo: 36.896.836/0001-63**
- ✅ **Não permite a criação de 2 empresas com o mesmo nome**

## Parte dos operadores:

- ✅ **Operador é criado, com os campos obrigatórios e opcionais**
- ✅ **Está atualizando os dados corretamente**
- ✅ **Está apagando corretamente**
- ✅ **É possível atualizar a empresa associada de um operador**
- ✅ **Operadores sem uma empresa associada aparecem corretamente**
- ✅ **Permite a criação de 2 operadores com o mesmo nome, por motivos de existir nomes comuns (Exemplo: João da Silva)**
- ✅ **Permite a criação de 2 operadores com o mesmo e-mail, por motivos de existir e-mail empresarial compartilhado por vários funcionários.**
- ✅ **Se uma empresa associada é excluída, na busca do operador aparece como "null" sendo possível depois associar uma empresa a um operador**
- ✅ **Busca tanto um operador, quanto uma lista de operadores.**
- ✅ **No retorno dos operadores volta o id da empresa_associada e o nome da empresa, por conta de que se houver várias empresas, pelo id não será possível distinguir**


## Parte dos relatórios:

- ✅ **Relatório é criado, com os campos obrigatórios e opcionais**
- ✅ **Se os campos opcionais não forem preenchidos, fica como "null"**
- ✅ **Ele permite gerar relatórios com os valores negativos também (não sei se é o caso)**
- ✅ **Quando o relatório está com o status "Arquivado" ele não retorna na busca**
- ✅ **Permite atualizar o status dos relatórios para "Não Arquivado" ou "Arquivado"**
- ✅ **Relatório permite busca por filtros**
- ✅ **Retornou pelo filtro de nome do operador**
- ✅ **Caso não tenha relatórios no filtro selecionado, retorna a mensagem correta**
- ✅ **Caso algum dado seja excluído, ao pesquisar o filtro, o campo excluído fica como "null"**
- ✅ **Arquiva e desarquiva relatórios pelo id**
- ✅ **Realiza a busca por todos os filtros**

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

## Como testar (exemplo no  **Insomnia**):

1. **Empresas**:
    
    - Criar: `POST http://localhost:3000/api/empresas`
    - Listar: `GET http://localhost:3000/api/empresas`
    - Editar: `PUT http://localhost:3000/api/empresas/:id`
    - Excluir: `DELETE http://localhost:3000/api/empresas/:id`
  
**URL de exemplo (post) -**
```
  {
    "nome": "Pixlog",
    "cnpj": "12345678000195",
    "endereco": "Rua Exemplo, 123",
    "telefone": "11999999999",
    "email": "contato@pixlog.com"
  }
```
      
2. **Operadores**:
    
    - Criar: `POST http://localhost:3000/api/operadores`
    - Listar: `GET http://localhost:3000/api/operadores`
    - Editar: `PUT http://localhost:3000/api/operadores/:id`
    - Excluir: `DELETE http://localhost:3000/api/operadores/:id`
      
**URL de exemplo (post) -**
```
      {
               "nome": "Luana da Silva" ,
               "cargo": "Desenvolvedora",
               "telefone": "469999192408",
	       "empresa": "Pixlog",
               "email": "lstylik1345@gmail.com"
}
```
      
3. **Relatórios**:
    
    - Criar: `POST http://localhost:3000/api/relatorios`
    - Listar: `GET http://localhost:3000/api/relatorios`
    - Arquivar: `PUT http://localhost:3000/api/relatorios/arquivar/:id`
    - Desarquivar: `PUT http://localhost:3000/api/relatorios/desarquivar/:id`

**URL de exemplo (post) -**
```
{
  "titulo": "Relatório 10",
  "descricao": "Relatório para análise de pilha",
  "empresa_associada": "Pixlog",
  "operador": "Luana da Silva",
  "volume": 100.5,
  "horario": "2024-11-22T10:00:00Z",
  "comprimento": 50,
  "status": "Não arquivado",
  "info_adicional": "informações adicionais"
}
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
├── migrations/        # Migrações do Sequelize
├── .env               # Exemplo do arquivo de configuração
├── package.json       # Dependências e scripts
├── README.md          # Documentação
└── server.js          # Arquivo principal do servidor
```
