const connection = require('../infraestructure/connection')

class Livro
{
    post(livro, res) {
        
        /* Validações dos dados*/
        const validacoes = [
            { campo: '', valido: true, mensagem: '' },
        ]

        const errors = validacoes.filter(campo => !campo.valido);
        const hasErrors = !!errors.length;

        if(hasErrors) {
            res.status(400).json(errors)
        } else {
            const sql = 'INSERT INTO livros SET ?';
            connection.query(sql, livro, (erro, result) => {
                if(erro)
                    res.status(400).json(erro);
                else {
                    res.status(201).json(livro);
                }
            });
        }
    }

    get(res) {
        const sql = `SELECT * FROM livros`;
        connection.query(sql, (erro, result) => {
            if(erro)
                res.status(400).json(erro);
            else
                res.status(200).json(result);
        });
    }

    getById(id, res) {
        const sql = `SELECT * FROM livros WHERE Id = ?`;

        connection.query(sql, id, (erro, result) => {
            if(erro)
                res.status(400).json(erro);
            else
                res.status(200).json(result[0]);
                // res.status(200).json(result.shift());
        });
    }

    update(id, livro, res) {

        const validacoes = []

        const errors = validacoes.filter(campo => !campo.valido);
        const hasErrors = !!errors.length;

        if(hasErrors) {
            res.status(400).json(errors)
        } else {            
            const sql = 'UPDATE livros SET ? WHERE Id = ?';
            connection.query(sql, [livro, id], (erro, result) => {
                if(erro)
                    res.status(400).json(erro);
                else
                    res.status(200).json({id, ...livro});
            });
        }
    }

    remove(id, res) {
        const sql = 'DELETE FROM livros WHERE Id = ?';

        connection.query(sql, id, (erro, result) => {
            if(erro)
                res.status(400).json(erro);
            else
                res.status(200).json({id});
        });
    }
}

module.exports = new Livro()