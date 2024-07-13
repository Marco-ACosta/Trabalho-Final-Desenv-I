## Requisitos Obrigatórios:

- [x] Repositório no github;
- [x] Base de dados "hackathon_db";
- [x] Tabela "avaliadores";
- [x] Tabela "equipes";
- [x] Tabela "avaliacoes";
- [x] POST avaliador;
- [x] GET/LIST avaliador;
- [x] DELETE avaliador;
- [x] POST equipe;
- [x] GET/LIST equipe;
- [x] DELETE equipe;
- [x] POST avaliação;
- [x] GET/LIST avaliação;
- [x] DELETE avaliação;
- [x] PUT avaliação;
- [ ] Rota PUT avaliação AUTENTICADA;
- [x] Scripts SQL salvos no projeto;
- [ ] Inserção de credenciais para cadastrar nota de avaliação;
- [x] Criação de avaliação não recebe nota;
- [x] Uso do axios no frontend;
- [x] Página inicial com 3 cards;
- [ ] Página de atribuição de nota para avaliação é AUTENTICADA;
- [ ] O avaliador só vê as equipes atribuidas a ele;
- [x] Perguntas da avaliação são estáticas;
- [x] As avaliações são notas númericas de 0-10;
- [x] A coluna dos questionários na tabela de "avaliacoes" é do tipo JSONB;
- [x] commits;

## Requisitos Extras:

- [ ] Autenticação com JWT;
- [ ] Deploy BACKEND;
- [ ] Deploy FRONTEND;
- [x] Estilização com tailwind;
- [ ] Validação com JOI ou YUP;
- [x] Repositórios BACKEND e FRONTEND separados;
- [x] Uso correto do .gitignore (ocultação de node_modules e .env);
- [x] Configuração do nodemon;

## Alertas:

  - No post do avaliador o campo "password" é passado na query porém esse campo não existe, e sim existe o campo "senha".

## Erros Críticos:
