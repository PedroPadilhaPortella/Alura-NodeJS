const mysql2 = require('mysql2')

const conexao = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'petshop_api'
})

module.exports = conexao
