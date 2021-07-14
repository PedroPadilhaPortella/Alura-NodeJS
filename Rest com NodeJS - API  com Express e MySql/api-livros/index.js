const customExpress = require('./config/custom-express')
const connection = require('./infraestructure/connection')
const Tables = require('./infraestructure/tables')

const port = 3000;

connection.connect(erro => {
    if (erro) {
        console.log(erro)
    } else {
        console.log('Conectado ao Mysql')
        Tables.init(connection)

        const app = customExpress()
        app.listen(port, () => console.log(`Servidor rodando na porta 3000\nhttps://localhost:${port}`))
    }
});