const app = require('express')()
const bodyParser = require('body-parser')
const config = require('config')

const formatosAceitos = require('./Serializador').formatosAceitos

const roteador = require('./rotas/fornecedores')
const roteadorV2 = require('./rotas/fornecedores/rotas.v2')

const NaoEncontrado = require('./erros/NaoEncontrado');
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const SerializadorError = require('./Serializador').SerializadorError

app.use(bodyParser.json());

app.use((requisicao, resposta, proximo) => {
    let formatoRequisitado = requisicao.header('Accept')
    
    if(formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json'
    }
    
    if(formatosAceitos.indexOf(formatoRequisitado) === -1) {
        return resposta.status(406).end();
    }
    
    resposta.setHeader('Content-Type', formatoRequisitado)
    proximo()
})

app.use((requisicao, resposta, proximo) => {
    resposta.set('Access-Control-Allow-Origin', '*')
    proximo()
})

app.use('/api/fornecedores', roteador);

app.use('/api/v2/fornecedores', roteadorV2);

app.use((error, requisicao, resposta, next) => {
    const serializadorErro = new SerializadorError(resposta.getHeader('Content-Type'))
    let status = 500
    if(error instanceof NaoEncontrado)
        status = 404;
    if(error instanceof CampoInvalido || error instanceof DadosNaoFornecidos)
        status = 400;
    if(error instanceof ValorNaoSuportado)
        status = 406;
    
    resposta.status(status).send(serializadorErro.serialize({message: error.message, id: error.idErro }))
});


app.listen(config.get('api.porta'), 
    () => console.log(`A API está rodando!\nhttp://localhost:${config.get('api.porta')}`))