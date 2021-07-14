class Tables {
    init(conexao) {
        this.conexao = conexao
        this.createTableAtendimentos()
    }

    createTableAtendimentos() {
        const sql = `CREATE TABLE IF NOT EXISTS Atendimentos (
            id int NOT NULL AUTO_INCREMENT,
            cliente varchar(50) NOT NULL,
            pet varchar(20) NULL,
            servico varchar(30) NOT NULL,
            dataAgendamento datetime NOT NULL,
            dataCriacao datetime NOT NULL,
            status varchar(20) NOT NULL,
            observacoes text,
            PRIMARY KEY(id)
        )`;
        
        this.conexao.query(sql, (erro) => {
            if(erro)
                console.log(erro);
            else
                console.log('tabela Atendimentos criada com sucesso');
        });
    }
}

module.exports = new Tables