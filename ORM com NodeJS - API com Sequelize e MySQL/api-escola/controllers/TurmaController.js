const database = require('../models')
const baseUrl = require('../environmet')
const Op = require('sequelize').Op

class TurmaController {

    static async getAll(req, res) {
        try {
            const { data_inicial, data_final } = req.query
            const where = {}

            data_inicial || data_final ? where.data_inicio = {} : null
            data_inicial ? where.data_inicio[Op.gte] = data_inicial: null
            data_final ? where.data_inicio[Op.lte] = data_final: null

            const turmas = await database.Turmas.findAll({ where })
            return res.status(200).json(turmas)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async getById(req, res) {
        try {
            const id = req.params.id
            const turmaDB = await database.Turmas.findOne({ where: { id }})
            if(!turmaDB)  
                return res.status(404).json({ message: `Entidade Turma de id ${id} não foi encontrado(a)` })
            return res.status(200).json(turmaDB)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async save(req, res) {
        try {
            let turma = req.body
            turma = await database.Turmas.create(turma)
            return res.status(201).json(turma)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id
            let turma = req.body

            const turmaDB = await database.Turmas.findOne({ where: { id }})
            if(!turmaDB)
                return res.status(404).json({ message: `Entidade Turma de id ${id} não foi encontrado(a)` })

            await database.Turmas.update(turma, { where: { id }})
            return res.status(200).json({ GET: `${baseUrl}/turmas/${id}` })
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }
    
    static async remove(req, res) {
        try {
            const id = req.params.id

            const turmaDB = await database.Turmas.findOne({ where: { id }})
            if(!turmaDB)  
                return res.status(404).json({ message: `Entidade Turma de id ${id} não foi encontrado(a)` })
            
            await database.Turmas.destroy({where: { id }})
            return res.status(200).end()
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async restore(req, res) {
        try {
            const id = req.params.id
            await database.Turmas.restore({ where: { id }})
            return res.status(200).end()
            
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

module.exports = TurmaController;