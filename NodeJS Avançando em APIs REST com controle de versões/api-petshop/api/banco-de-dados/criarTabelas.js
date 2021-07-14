const Modelos = [
    require('../rotas/fornecedores/ModeloTabelaFornecedor'),
    require('../rotas/fornecedores/produtos/ModeloTabelaProduto')
]

async function criarTabelas() {
    for (let i = 0; i < Modelos.length; i++) {
        const modelo = Modelos[i]
        await modelo.sync()
    }
}

criarTabelas();