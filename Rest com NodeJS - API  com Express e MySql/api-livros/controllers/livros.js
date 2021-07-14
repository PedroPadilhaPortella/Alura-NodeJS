const Livros = require('../models/livros')

module.exports = app => {

    app.get('/livros', (req, res) => {
        Livros.get(res);
    });

    app.get('/livros/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Livros.getById(id, res);
    });
    
    app.post('/livros/', (req, res) => {
        const livros = req.body;
        Livros.post(livros, res);
    });
    
    app.put('/livros/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const livro = req.body;
        Livros.update(id, livro, res);
    });

    app.patch('/livros/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const livro = req.body;
        Livros.update(id, livro, res);
    });

    app.delete('/livros/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Livros.remove(id, res);
    });
}