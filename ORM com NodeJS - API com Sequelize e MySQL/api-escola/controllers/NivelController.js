const database = require('../models')
const baseUrl = require('../environmet')

class NivelController {

    static async getAll(req, res) {
        try {
            const niveis = await database.Niveis.findAll()
            return res.status(200).json(niveis)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async getById(req, res) {
        try {
            const id = req.params.id
            const nivelDB = await database.Niveis.findOne({ where: { id }})
            if(!nivelDB)  
                return res.status(404).json({ message: `Entidade Nível de id ${id} não foi encontrado(a)` })
            return res.status(200).json(nivelDB)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async save(req, res) {
        try {
            let nivel = req.body
            nivel = await database.Niveis.create(nivel)
            return res.status(201).json(nivel)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id
            let nivel = req.body

            const nivelDB = await database.Niveis.findOne({ where: { id }})
            if(!nivelDB)  
                return res.status(404).json({ message: `Entidade Nível de id ${id} não foi encontrado(a)` })

            await database.Niveis.update(nivel, { where: { id }})
            return res.status(200).json({ GET: `${baseUrl}/niveis/${id}` })
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }
    
    static async remove(req, res) {
        try {
            const id = req.params.id

            const nivelDB = await database.Niveis.findOne({ where: { id }})
            if(!nivelDB)  
                return res.status(404).json({ message: `Entidade Nível de id ${id} não foi encontrado(a)` })
            
            await database.Niveis.destroy({where: { id }})
            return res.status(200).end()
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async restore(req, res) {
        try {
            const id = req.params.id
            await database.Niveis.restore({ where: { id }})
            return res.status(200).end()
            
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

module.exports = NivelController;