class Tables {
    init(conexao) {
        this.conexao = conexao
        this.createTableLivros()
    }

    createTableLivros() {
        const sql = `CREATE TABLE IF NOT EXISTS livros (
            Id int NOT NULL AUTO_INCREMENT,
            Titulo longtext NOT NULL,
            Autor longtext NOT NULL,
            Editora longtext NOT NULL,
            QuantidadeDePaginas int NOT NULL,
            QuantidadeDeExemplares int NOT NULL,
            PRIMARY KEY(Id)
        )`;
        
        this.conexao.query(sql, (erro) => {
            if(erro)
                console.log(erro);
            else
                console.log('tabela livros criada com sucesso');
        });
    }
}

module.exports = new Tables