# 📚 Sistema de Gestão Académica (Frontend Ready • Backend Ready)

## 📌 Visão Geral

Este projeto consiste em um **sistema web de gestão académica**, desenvolvido inicialmente para funcionar **100% no frontend**, utilizando **HTML, CSS e JavaScript puro**, porém **arquitetado estrategicamente para futura implementação com Node.js**.

Todo o código foi pensado para **simular comportamentos reais de backend**, aplicando conceitos de **arquitetura limpa**, **separação de responsabilidades**, **boas práticas de organização** e **preparação para escalabilidade**.

O sistema pode ser utilizado como:

* Projeto acadêmico
* Projeto de portfólio
* Base para evolução para um sistema fullstack

---

## 🎯 Objetivo do Projeto

* Criar um sistema funcional e organizado no frontend
* Simular lógica de backend no navegador
* Preparar o projeto para migração futura para Node.js
* Aplicar padrões de projeto e arquitetura
* Demonstrar maturidade técnica e visão de escalabilidade

---

## ⚙️ Funcionalidades

* Cadastro de utilizadores / candidatos
* Listagem de dados em tabelas dinâmicas
* Edição de registros
* Remoção de registros
* Persistência de dados no navegador (LocalStorage)
* Simulação de backend (Controllers, Repositories, Services)
* Código preparado para:

  * Uso de arquivo único `db.json` como banco de dados simulado
  * Leitura e escrita com `fs` no futuro
  * Criptografia de senhas

---

## 🛠 Tecnologias Utilizadas

### Frontend (Atual)

* HTML5
* CSS3 (layout moderno e responsivo)
* JavaScript ES6+
* LocalStorage

### Backend (Preparado – Não Implementado)

* Node.js
* File System (`fs`) com `db.json` único
* Arquitetura MVC / Clean Architecture
* Criptografia com `bcrypt` ou `crypto` (planejado)

---

## 🧠 Arquitetura do Sistema

O projeto foi estruturado para **simular um backend real mesmo rodando apenas no navegador**.

### Camadas Implementadas

* **Controller** → Contém a lógica de negócio
* **Repository** → Responsável pelo acesso aos dados
* **Service** → Regras específicas (ex: validações, autenticação)
* **UI / DOM** → Interação com o utilizador

Essa separação permite que o **LocalStorage seja facilmente substituído pelo `fs`** sem grandes alterações, mantendo a integridade da arquitetura.

> 💡 Observação: A arquitetura de pastas é muito bem pensada. Separar **scripts, páginas, backend simulado, utils e assets públicos** deixa o projeto extremamente organizado e facilita manutenção e escalabilidade. É uma abordagem profissional, perfeita para portfólio e futura evolução para fullstack.

---

## 🗄 Persistência de Dados

### Situação Atual

* Todos os dados do sistema estão em **um único arquivo JSON**: `/simulated-backend/db.json`
* Contém todas as entidades: usuários/admins, candidatos, cursos e sessões
* O sistema já possui **estratégias preparadas** para leitura/escrita via LocalStorage ou `fs`

### Estrutura do `db.json`

```json
{
  "users": [],
  "candidates": [],
  "courses": [],
  "sessions": []
}
```

Essa abordagem garante:

* Simulação completa de um banco de dados
* CRUD funcional mesmo no frontend
* Migração simples para Node.js

---

## 🔐 Segurança e Criptografia de Senhas (Preparado)

O sistema **já possui código e estratégia pensados para criptografia**, porém **não aplicados no frontend por não ser permito o uso do Nodejs**.

### Estratégia Planejada

* Criptografia de senhas antes do armazenamento
* Uso de:

  * `bcrypt`
  * ou `crypto`
* Utilização de `salt`
* Comparação segura de hash

> ⚠️ IMPORTANTE: A criptografia real **deve ser aplicada apenas no backend** após a implementação com Node.js.

---

## 📂 Estrutura do Projeto

```
README.md
│
└── src
    │   global.css
    │   index.css
    │   index.html
    │
    ├── index.scripts
    │   │   animation-on-scroll.js
    │   │   auto-candidates.js
    │   │   check.js
    │   │   db-generator.js
    │   │   menu.mobile.js
    │
    ├── pages
    │   ├── auth
    │   │   │   auth.global.css
    │   │   │
    │   │   ├── login
    │   │   │   │   login.css
    │   │   │   │   login.html
    │   │   │   │
    │   │   │   └── scripts
    │   │   │           login-handler.js
    │   │   │
    │   │   └── register
    │   │       │   register.css
    │   │       │   register.html
    │   │       │
    │   │       └── scripts
    │   │               register-handler.js
    │   │
    │   └── dashboard
    │       └── admin
    │           │   admin.global.css
    │           │
    │           ├── candidates
    │           │   │   candidates.css
    │           │   │   candidates.html
    │           │   │
    │           │   └── scripts
    │           │           update-modal.js
    │           │
    │           └── overview
    │               │   overview.css
    │               │   overview.html
    │               │
    │               └── scripts
    │                       chart.js
    │                       overflow.js
    │
    ├── public
    │   ├── imgs
    │   │       background.png
    │   │       blue-bg.svg
    │   │       course-img-1.jpg
    │   │       course-img-2.jpg
    │   │       course-img-3.jpg
    │   │       course-img-4.png
    │   │
    │   └── logos
    │           ipial-logo.png
    │           ipial-logo (2).png
    │
    └── simulated-backend
        │   db.json
        │
        ├── controller
        │   ├── auth
        │   │       auth.controller.js
        │   │       auth.manual.test.js
        │   │
        │   └── candidate
        │           candidate.controller.js
        │           candidate.manual.test.js
        │
        ├── db-manager
        │   │   db-manager.interface.js
        │   │   db-manager.service.js
        │   │
        │   └── strategies
        │           fs.strategy.js
        │           localstorage.strategy.js
        │
        ├── repositories
        │   │   repository.interface.js
        │   │
        │   ├── admin
        │   │       admin.repository.js
        │   │
        │   ├── candidate
        │   │       candidate.repository.js
        │   │
        │   ├── course
        │   │       course.repository.js
        │   │
        │   └── session
        │           session.repository.js
        │
        ├── services
        │       candidate.service.js
        │
        └── utils
            ├── hasher
            │   │   hasher.interface.js
            │   │   hash.service.js
            │   │
            │   └── strategies
            │           crypto.strategy.js
            │
            └── token-actions
                │   token-actions.interface.js
                │   token-actions.service.js
                │
                └── strategies
                        crypto.strategy.js
```

---

## ▶️ Como Executar o Projeto

### Frontend

1. Faça o download do projeto
2. Abra `src/index.html` no navegador

### Backend (Futuro)

```bash
npm install
npm start
```

---

## 🚀 Evoluções Futuras Planejadas

* Implementação completa com Node.js
* Criação de API REST
* Autenticação com JWT
* Middleware de autorização
* Banco de dados real (MySQL, PostgreSQL ou MongoDB)
* Deploy em servidor
* Integração com framework frontend

---

## ⚠️ Avisos Importantes

* O projeto **funciona apenas no frontend atualmente**
* O código **já está preparado para backend real** usando o `db.json` único
* Arquitetura evita acoplamento
* Estratégias de segurança estão documentadas
* Ideal para estudo, evolução gradual e portfólio

---

## 👤 Autor

**Estudantes do Instituto Politecnico Industrial Alda Lara. Sala: 07. Turma: I12DT**
Estudante de Engenharia Informática
Luanda – Angola 🇦🇴

---

## 📄 Licença

Este projeto foi desenvolvido exclusivamente para fins educacionais e acadêmicos.
