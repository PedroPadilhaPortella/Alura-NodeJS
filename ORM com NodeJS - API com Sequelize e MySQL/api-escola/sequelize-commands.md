## Comandos do Sequelize ORM

* Inicializando sequelize e criando arquivos base
> npx sequelize init

## Config.json
>Arquivo de configurações do banco de dados
>Bancos de dados aceitos: 'mysql' | 'mariadb' | 'postgres' | 'mssql'
```
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL Server
```

### Models
* criando a models das tabelas com sequelize
>npx sequelize-cli model:create  --name Pessoas --attributes nome:string,ativo:boolean,email:string,role:string

>npx sequelize-cli model:create --name Niveis --attributes descricao_nivel:string

>npx sequelize-cli model:create --name Turmas --attributes data_inicio:dateonly

>npx sequelize-cli model:create --name Matriculas --attributes status:string

## Configurando as Foreign Keys e Relacionamentos
* Associando os atributos nas models:
```javascript
static associate(models) {
    Pessoas.hasMany(models.Turmas, { foreignKey: 'docente_id' })
    Pessoas.hasMany(models.Matriculas, { foreignKey: 'estudante_id'})
}
```
```javascript
static associate(models) {
      Turmas.hasMany(models.Matriculas, { foreignKey: 'turma_id' })
      Turmas.belongsTo(models.Pessoas, { foreignKey: 'docente_id' });
      Turmas.belongsTo(models.Niveis, { foreignKey: 'nivel_id' });
    }
```

* Referenciando relacionamento nas migrations para gerar no banco de dados:
```javascript
estudante_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'Pessoas', key: 'id' }
},
turma_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'Turmas', key: 'id' }
},
```

### Migrations
* rodando as migrations
> npx sequelize-cli db:migrate

* desfazendo a migration mais recente
> npx sequelize-cli db:migrate:undo

* desfazendo todas as migrations
> npx sequelize-cli db:migrate:undo

* desfazendo uma migration expecifica
> db:migrate:undo --name [data-hora]-create-[nome-da-tabela].js


### Seed Data
* criando seed de uma tabela
> npx sequelize seed:generate --name demo-pessoa

* semeando dados de todas as seeds
> npx sequelize db:seed:all

* desfazendo semeaduras
> npx sequelize db:seed:undo

* desfazendo semeaduras de arquivo expecifico
> npx sequelize-cli db:seed:undo --seed nome-do-arquivo

* desfazendo todas as semeaduras
> npx sequelize-cli db:seed:undo:all 