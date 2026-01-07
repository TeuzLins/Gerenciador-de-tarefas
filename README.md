## Gerenciador de Tarefas (Estilo Trello)
Aplicação Full Stack para gerenciamento de tarefas no estilo Trello, permitindo a criação de quadros, listas e cartões, com suporte a arrastar e soltar (drag and drop) e persistência de dados no backend.

## Projeto desenvolvido com foco em boas práticas, arquitetura limpa e tecnologias modernas.

## Tecnologias Utilizadas
🔹 Frontend
```
React.js
Tailwind CSS
dnd-kit (drag and drop)
Axios
Vite
```
🔹 Backend
```
Java 17+
Spring Boot 3
Spring Web
Spring Data JPA
Hibernate
Banco de Dados H2 / PostgreSQL
Maven
```
## Funcionalidades
• CRUD de Quadros (Boards)
• CRUD de Listas
• CRUD de Cartões
• Arrastar e soltar listas e cartões
• Atualização de posição (ordem) via API
• Arquitetura REST
• Separação Frontend e Backend
• Persistência em banco de dados

## Arquitetura do Projeto
```
gerenciador-de-tarefas/
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   └── dto/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── styles/
│
└── README.md
```

## Fluxo da Aplicação
Usuário cria um Board
Dentro do Board, cria Listas
Dentro das Listas, cria Cartões
É possível arrastar listas e cartões
A nova ordem é salva automaticamente no backend

## Endpoints Principais (Backend)
• Boards
• GET /boards
• POST /boards
• PUT /boards/{id}
• DELETE /boards/{id}
• Listas
• POST /lists
• PUT /lists/{id}/position
• Cartões
• POST /cards
• PUT /cards/{id}/position

## Como Executar o Projeto
```
🔹 Backend
cd backend
mvn spring-boot:run
```

Backend disponível em:
http://localhost:8080

```
🔹Frontend
cd frontend
npm install
npm run dev
```
Frontend disponível em:
http://localhost:5173

## Testes
• Testes unitários (em desenvolvimento)
• Testes de integração via API REST

## Melhorias Futuras:
• Autenticação e autorização (JWT)
• Usuários e permissões
• Boards compartilhados
• Responsividade mobile
• Logs e métricas
• Dockerização

## Autor
Mateus de Lima Lins Prestes
Desenvolvedor Backend / Full Stack
GitHub: https://github.com/TeuzLins
LinkedIn: https://www.linkedin.com/in/mateus-de-lima-lins-prestes/

<td align="center"><a href="https://github.com/TeuzLins"><img style="border-radius: 50%;" src="https://github.com/TeuzLins.png" width="100px;" alt=""/><br /><sub><b>Teuz Lins </b></sub></a><br /><a href="https://github.com/russo313" title="Rocketseat"> - Backend Developer</a></td>
                              </tr>
                                    <tr>

## Licença
Este projeto é de uso educacional e livre para estudos.
