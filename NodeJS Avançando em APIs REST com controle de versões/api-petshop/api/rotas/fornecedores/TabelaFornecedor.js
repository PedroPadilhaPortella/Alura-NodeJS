const Modelo = require('./ModeloTabelaFornecedor')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
    listar () {
        return Modelo.findAll({ raw: true })
    },
    inserir(fornecedor) {
        return Modelo.create(fornecedor)
    },
    async pegarPorId(id) {
        const fornecedor = await Modelo.findOne({ where: { id: id }})
        if(!fornecedor) throw new NaoEncontrado('Fornecedor')
        return fornecedor;
    },
    async atualizar(id, dadosParaAtualizar) {
        return Modelo.update(dadosParaAtualizar, { where: { id: id } })
    },
    async deletar(id) {
        return Modelo.destroy({ where: { id: id }})
    }
}