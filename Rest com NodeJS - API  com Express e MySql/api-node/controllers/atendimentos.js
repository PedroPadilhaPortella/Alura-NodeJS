const Atendimento = require('../models/atendimento')

module.exports = app => {

    app.get('/atendimentos', (req, res) => {
        Atendimento.get(res);
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.getById(id, res);
    });
    
    app.post('/atendimentos/', (req, res) => {
        const atendimento = req.body;
        Atendimento.post(atendimento, res);
    });
    
    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const atendimento = req.body;
        Atendimento.update(id, atendimento, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.remove(id, res);
    });
}