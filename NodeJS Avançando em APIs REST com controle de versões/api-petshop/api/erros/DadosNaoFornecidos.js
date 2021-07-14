class DadosNaoFornecidos extends Error {

    constructor() {
        super(`Nenhum dado foi fornecido para atualizar`)
        this.name = 'DadosNaoFornecidos'
        this.idErro = 2
    }
}

module.exports = DadosNaoFornecidos