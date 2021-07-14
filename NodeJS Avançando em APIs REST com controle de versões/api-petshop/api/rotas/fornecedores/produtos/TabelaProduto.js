const instancia = require('../../../banco-de-dados')
const Modelo = require('./ModeloTabelaProduto')
const NaoEncontrado = require('../../../erros/NaoEncontrado')

module.exports = {
    listar (id) {
        return Modelo.findAll({ where: { fornecedor: id }, raw: true })
    },
    inserir(produto) {
        return Modelo.create(produto)
    },
    async pegarPorId(idProduto, idFornecedor) {
        const produto = await Modelo.findOne({ 
            where: { id: idProduto, fornecedor: idFornecedor }, 
            raw: true 
        });

        if(!produto) throw new NaoEncontrado('Produto')
        return produto;
    },
    async atualizar(identifiers, dadosParaAtualizar) {
        return Modelo.update(dadosParaAtualizar, { where: identifiers })
    },
    async deletar(idProduto, idFornecedor) {
        return Modelo.destroy({ where: { id: idProduto, fornecedor: idFornecedor }})
    },
    subtrair(idProduto, idFornecedor, campo, valor) {
        return instancia.transaction(async transacao => {
            const produto = await Modelo.findOne({ where: { id: idProduto, fornecedor: idFornecedor }})
            produto[campo] = valor
            
            await produto.save()
            return produto
        });
    }
}