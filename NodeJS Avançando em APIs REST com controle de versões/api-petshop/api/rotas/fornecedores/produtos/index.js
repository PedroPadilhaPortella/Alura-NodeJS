const roteador = require('express').Router({ mergeParams: true })
const Tabela = require('./TabelaProduto')
const Produto = require('./Produto')
const SerializadorProduto = require('../../../Serializador').SerializadorProduto

roteador.options('/', async(requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, POST')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204).end()
});

roteador.get('/', async (requisicao, resposta) => {
    const id = requisicao.fornecedor.id
    const produtos = await Tabela.listar(id)
    const serializador = new SerializadorProduto(resposta.getHeader('Content-Type'))
    resposta.status(200).send(serializador.serialize(produtos))
});

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.fornecedor.id
        const body = requisicao.body
        const data = Object.assign({}, body, { fornecedor: id })
        const produto = new Produto(data)
        await produto.criar()

        const timestamp = new Date(produto.dataAtualizacao).getTime()
        resposta.set('Last-Modified', timestamp)
        resposta.set('ETag', produto.versao)
        resposta.set('Location', `/api/fornecedores/${produto.fornecedor}/produtos/${produto.id}`)

        const serializador = new SerializadorProduto(resposta.getHeader('Content-Type'))
        resposta.status(201).send(serializador.serialize(produto))
    } catch(err) {
        proximo(err)
    }
});

roteador.options('/:idProduto', async(requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, HEAD, PUT, DELETE')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204).end()
});

roteador.get('/:idProduto', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idProduto
        const fornecedor = requisicao.fornecedor.id
        const produto = new Produto({ id, fornecedor })
        await produto.carregarPorId()

        const timestamp = new Date(produto.dataAtualizacao).getTime()
        resposta.set('Last-Modified', timestamp)
        resposta.set('ETag', produto.versao)

        const serializador = new SerializadorProduto(
            resposta.getHeader('Content-Type'), 
            ['preco', 'estoque', 'fornecedor', 'dataCriacao', 'dataAtualizacao', 'versao']
        );
        resposta.status(200).send(serializador.serialize(produto))
    } catch(err) {
        proximo(err)
    }
});

roteador.head('/:idProduto', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idProduto
        const fornecedor = requisicao.fornecedor.id
        const produto = new Produto({ id, fornecedor })
        await produto.carregarPorId()

        const timestamp = new Date(produto.dataAtualizacao).getTime()
        resposta.set('Last-Modified', timestamp)
        resposta.set('ETag', produto.versao)
        
        resposta.status(200).end()
    } catch(err) {
        proximo(err)
    }
});

roteador.put('/:idProduto', async (requisicao, resposta, proximo) => {
    try {
        const idProduto = requisicao.params.idProduto
        const idFornecedor = requisicao.fornecedor.id
        const body = requisicao.body
        const data = Object.assign({}, body, { id: idProduto, fornecedor: idFornecedor })

        const produto = new Produto(data)
        await produto.atualizar()
        await produto.carregarPorId()

        const timestamp = new Date(produto.dataAtualizacao).getTime()
        resposta.set('Last-Modified', timestamp)
        resposta.set('ETag', produto.versao)

        resposta.status(204).end()

    } catch(error) {
        proximo(error)
    }
});

roteador.delete('/:idProduto', async (requisicao, resposta) => {
    const identifiers = { idFornecedor: requisicao.fornecedor.id, idProduto: requisicao.params.idProduto }
    const produto = new Produto({ id: identifiers.idProduto, fornecedor: identifiers.idFornecedor })
    await produto.remover()
    resposta.status(204).send()
});

roteador.options('/:idProduto/diminuir-estoque', async(requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'POST')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204).end()
});

roteador.post('/:idProduto/diminuir-estoque', async (requisicao, resposta, proximo) => {
    try {
        const idProduto = requisicao.params.idProduto
        const idFornecedor = requisicao.fornecedor.id
        const quantidade = requisicao.body.quantidade
        const produto = new Produto({ id: idProduto, fornecedor: idFornecedor })

        await produto.carregarPorId()
        produto.estoque -= quantidade
        await produto.diminuirEstoque()
        await produto.carregarPorId()

        const timestamp = new Date(produto.dataAtualizacao).getTime()
        resposta.set('Last-Modified', timestamp)
        resposta.set('ETag', produto.versao)

        resposta.status(204).end()

    } catch(error) {
        proximo(error)
    }
});

module.exports = roteador