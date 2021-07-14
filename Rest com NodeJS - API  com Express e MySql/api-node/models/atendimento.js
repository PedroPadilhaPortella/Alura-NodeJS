const moment = require('moment')

const connection = require('../infraestructure/connection')

class Atendimento {
    post(atendimento, res) {

        const dataCriacao = moment().format("YYYY-MM-DD HH:mm:ss");
        const dataAgendamento = moment(atendimento.dataAgendamento, 'DD/MM/YYYY HH:mm:ss').format("YYYY-MM-DD HH:mm:ss")
        
        /* Validações dos dados*/
        const dateIsValid = moment(dataAgendamento).isSameOrAfter(dataCriacao);
        const clientIsValid = atendimento.cliente.length >= 4;

        const validacoes = [
            { campo: 'data', valido: dateIsValid, mensagem: 'Data deve ser maior ou igual a data atual' },
            { campo: 'cliente', valido: clientIsValid, mensagem: 'Nome do Cliente deve conter mais de 4 caracteres' }
        ]

        const errors = validacoes.filter(campo => !campo.valido);
        const hasErrors = !!errors.length;

        if(hasErrors) {
            res.status(400).json(errors)

        } else {
            const atendimentoDB = { ...atendimento, dataAgendamento, dataCriacao }
            
            const sql = 'INSERT INTO Atendimentos SET ?';
            
            connection.query(sql, atendimentoDB, (erro, result) => {
                if(erro)
                    res.status(400).json(erro);
                else
                    res.status(201).json({atendimento});
            });
        }
    }

    get(res) {
        const sql = `SELECT * FROM Atendimentos`;
        connection.query(sql, (erro, result) => {
            if(erro)
                res.status(400).json(erro);
            else
                res.status(200).json(result);
        });
    }

    getById(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ?`;

        connection.query(sql, id, (erro, result) => {
            if(erro)
                res.status(400).json(erro);
            else
                res.status(200).json(result[0]);
        });
    }

    update(id, atendimento, res) {

        const validacoes = []

        if(atendimento.dataAgendamento) {
            atendimento.dataAgendamento = moment(atendimento.dataAgendamento, 'DD/MM/YYYY HH:mm:ss').format("YYYY-MM-DD HH:mm:ss");
            const dateIsValid = moment(atendimento.dataAgendamento).isSameOrAfter(atendimento.dataCriacao);
            validacoes.push({campo: 'data', valido: dateIsValid, mensagem: 'Data deve ser maior ou igual a data atual'});
        }

        if(atendimento.cliente) {
            const clientIsValid = atendimento.cliente.length >= 4;
            validacoes.push({campo: 'cliente', valido: clientIsValid, mensagem: 'Nome do Cliente deve conter mais de 4 caracteres'});
        }

        const errors = validacoes.filter(campo => !campo.valido);
        const hasErrors = !!errors.length;

        if(hasErrors) {
            res.status(400).json(errors)

        } else {            
            const sql = 'UPDATE Atendimentos SET ? WHERE id = ?';
            
            connection.query(sql, [atendimento, id], (erro, result) => {
                if(erro)
                    res.status(400).json(erro);
                else
                    res.status(200).json({id, ...atendimento});
            });
        }
    }

    remove(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id = ?';

        connection.query(sql, id, (erro, result) => {
            if(erro)
                res.status(400).json(erro);
            else
                res.status(200).json({id});
        });
    }
}

module.exports = new Atendimento()