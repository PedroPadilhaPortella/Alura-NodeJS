const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

roteador.options('/', async(requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204).end()
});

roteador.get('/', async (requisicao, resposta) => {
    const fornecedores = await TabelaFornecedor.listar()
    const serializador = new SerializadorFornecedor(resposta.getHeader('Content-Type'))
    resposta.status(200).send(serializador.serialize(fornecedores))
});

module.exports = roteador