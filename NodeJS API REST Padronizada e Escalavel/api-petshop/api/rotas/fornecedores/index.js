const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

roteador.get('/', async (requisicao, resposta) => {
    const fornecedores = await TabelaFornecedor.listar()
    const serializador = new SerializadorFornecedor(resposta.getHeader('Content-Type'))
    resposta.status(200).send(serializador.serialize(fornecedores))
});

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dados = requisicao.body
        const fornecedor = new Fornecedor(dados)
        await fornecedor.criar()
        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type'), ['email', 'dataCriacao', 'dataAtualizacao', 'versao'])
        resposta.status(201).send(serializador.serialize(fornecedor))
    } catch(error) {
        proximo(error)
    }
});

roteador.get('/:id', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.id
        const fornecedor = new Fornecedor({ id })
        await fornecedor.carregarPorId()
        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type'), ['email', 'dataCriacao', 'dataAtualizacao', 'versao'])
        resposta.status(200).send(serializador.serialize(fornecedor))
    } catch(error) {
        proximo(error)
    }
});

roteador.put('/:id', async (requisicao, resposta, next) => {
    try {
        const id = requisicao.params.id
        const body = requisicao.body
        const data = Object.assign({}, body, { id: id })
        const fornecedor = new Fornecedor(data)
        await fornecedor.atualizar()
        resposta.status(204).end()
    } catch(error) {
        next(error)
    }
});

roteador.delete('/:id', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.id
        const fornecedor = new Fornecedor({ id })
        await fornecedor.carregarPorId()
        await fornecedor.remover()
        resposta.status(204).end()
    } catch(error) {
        proximo(error)
    }
});

module.exports = roteador