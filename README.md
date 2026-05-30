# API REST - Clientes e Pedidos

## Sobre o Projeto

Este projeto foi desenvolvido com o objetivo de praticar conceitos fundamentais do desenvolvimento Back-end utilizando Java e Spring Boot.

A aplicação consiste em uma API REST para gerenciamento de clientes e pedidos, permitindo operações completas de cadastro, consulta, atualização e remoção de dados (CRUD), além do relacionamento entre entidades utilizando JPA e PostgreSQL.

Além da API, foi desenvolvido um Front-end simples utilizando HTML, CSS e JavaScript para consumir os endpoints e simular um cenário real de utilização.

---

## Preview da Aplicação

![Preview do Sistema](./docs/preview.png)

---

## Tecnologias Utilizadas

### Back-end

* Java 21
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate
* PostgreSQL
* Maven
* Swagger / OpenAPI

### Front-end

* HTML5
* CSS3
* JavaScript
* Fetch API

---

## Arquitetura do Projeto

O projeto foi estruturado seguindo a arquitetura em camadas:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
PostgreSQL
```

### Responsabilidade de cada camada

#### Controller

Responsável por receber as requisições HTTP e retornar as respostas para o cliente.

#### Service

Responsável pelas regras de negócio da aplicação.

#### Repository

Responsável pela comunicação com o banco de dados através do Spring Data JPA.

#### Database

Responsável pelo armazenamento permanente das informações.

---

## Conceitos Aplicados

Durante o desenvolvimento foram praticados os seguintes conceitos:

### Programação Orientada a Objetos

* Classes e Objetos
* Encapsulamento
* Construtores
* Relacionamento entre entidades

### Spring Boot

* Injeção de Dependência
* Controllers
* Services
* Repositories
* Inversão de Controle (IoC)

### API REST

* GET
* POST
* PUT
* DELETE
* RequestBody
* PathVariable
* JSON

### Banco de Dados

* PostgreSQL
* JPA
* Hibernate
* Relacionamento ManyToOne

### Front-end

* HTML
* CSS
* JavaScript
* Fetch API
* Consumo de APIs REST

### Documentação

* Swagger/OpenAPI
* Testes de endpoints
* Documentação automática

---

## Estrutura do Projeto

```text
src
 ├── controller
 ├── service
 ├── repository
 ├── model
 └── config

front
 ├── index.html
 ├── style.css
 └── script.js

docs
 └── preview.png
```

---

## Funcionalidades

### Clientes

* Cadastrar cliente
* Listar clientes
* Buscar cliente por ID
* Atualizar cliente
* Remover cliente

### Pedidos

* Cadastrar pedido
* Listar pedidos
* Buscar pedido por ID
* Atualizar pedido
* Remover pedido
* Vincular pedido a um cliente

---

# URLs do Projeto

## API

```text
http://localhost:8080
```

## Swagger

```text
http://localhost:8080/swagger-ui/index.html
```

## OpenAPI JSON

```text
http://localhost:8080/v3/api-docs
```

---

# Endpoints Disponíveis

## Clientes

```http
POST   /clientes
GET    /clientes
GET    /clientes/{id}
PUT    /clientes/{id}
DELETE /clientes/{id}
```

## Pedidos

```http
POST   /pedido/cliente/{id}
GET    /pedido
GET    /pedido/{id}
PUT    /pedido/{id}
DELETE /pedido/{id}
```

---

# Como Executar o Projeto

## 1 - Clonar o Repositório

```bash
git clone https://github.com/willianpapa132-sketch/PedidosVendas
```

## 2 - Abrir no IntelliJ IDEA

Abra a pasta do projeto normalmente.

## 3 - Configurar o PostgreSQL

Exemplo de configuração:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/testeapi
spring.datasource.username=postgres
spring.datasource.password=sua_senha

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## 4 - Executar a Aplicação

Execute:

```text
ApiApplication.java
```

A API ficará disponível em:

```text
http://localhost:8080
```

---

# Como Testar

## Teste pelo Swagger

Acesse:

```text
http://localhost:8080/swagger-ui/index.html
```

No Swagger é possível:

* Visualizar endpoints
* Testar requisições
* Enviar JSON
* Visualizar respostas
* Ver status HTTP

---

## Teste pelo Front-end

Abra:

```text
front/index.html
```

O sistema permite:

### Clientes

* Cadastro
* Consulta
* Atualização
* Exclusão

### Pedidos

* Cadastro
* Consulta
* Atualização
* Exclusão

---

# Exemplos de Requisições

## Criar Cliente

```http
POST /clientes
```

```json
{
  "nome": "Willian",
  "email": "willian@email.com",
  "telefone": "41999999999"
}
```

---

## Atualizar Cliente

```http
PUT /clientes/1
```

```json
{
  "nome": "Willian Atualizado",
  "email": "willian@email.com",
  "telefone": "41999999999"
}
```

---

## Criar Pedido

```http
POST /pedido/cliente/1
```

```json
{
  "descricao": "Compra de teste",
  "valor": 250.00
}
```

---

## Atualizar Pedido

```http
PUT /pedido/1
```

```json
{
  "descricao": "Compra atualizada",
  "valor": 350.00
}
```

---

# Aprendizados Obtidos

Este projeto foi desenvolvido para consolidar conhecimentos em:

* Desenvolvimento de APIs REST
* Spring Boot
* JPA/Hibernate
* PostgreSQL
* Arquitetura em camadas
* Relacionamento entre entidades
* Consumo de APIs via JavaScript
* Documentação com Swagger/OpenAPI
* Integração Front-end ↔ Back-end

---
# preview
<img width="1351" height="592" alt="image" src="https://github.com/user-attachments/assets/6069b50e-aa4d-4bb7-9e86-3647758bbf04" />


# Próximos Passos

* Tratamento Global de Exceptions
* Bean Validation
* DTOs
* Spring Security
* JWT
* Testes Unitários
* Docker
* Deploy em Nuvem
* Boas práticas de arquitetura

---

## Autor

**Willian Vinicius Souza da Silva**

Estudante de Análise e Desenvolvimento de Sistemas com foco em desenvolvimento Back-end utilizando Java e Spring Boot.
