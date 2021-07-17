const database = require('../models')
const baseUrl = require('../environmet')
const Sequelize = require('sequelize')

class PessoaController {
 
    static async getAll(req, res) {
        try {
            const pessoas = await database.Pessoas.scope('all').findAll()
            return res.status(200).json(pessoas)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async getAllActive(req, res) {
        try {
            const pessoas = await database.Pessoas.findAll()
            return res.status(200).json(pessoas)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async getById(req, res) {
        try {
            const id = req.params.id
            const pessoaDB = await database.Pessoas.findOne({ where: { id }})
            if(!pessoaDB)  
                return res.status(404).json({ message: `Entidade Pessoa de id ${id} não foi encontrado(a)` })
            return res.status(200).json(pessoa)
        } catch(err) {
            return res.status(404).json({ message: err.message })
        }
    }

    static async getMatriculas(req, res) {
        try {
            const id = req.params.id

            const estudante = await database.Pessoas.findOne({ where: { id }})
            if(!estudante)  
                return res.status(404).json({ message: `Estudante de id ${id} não foi encontrado(a)` })

            const matriculas = await estudante.getAulasMatriculadas()

            return res.status(200).json(matriculas)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async getMatriculasByTurma(req, res) {
        try {
            const turma_id = req.params.turmaId

            const matriculas = await database.Matriculas.findAndCountAll({ 
                where: { turma_id, status: 'confirmado' }, 
                limit: 20,
                order: [[ 'estudante_id', 'ASC' ]]
            })

            return res.status(200).json(matriculas)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async getTurmasLotadas(req, res) {
        const lotacao = 50
        try {
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where: { status: 'confirmado'},
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacao}`) 
            });
            return res.status(200).json(turmasLotadas.count)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }


    static async save(req, res) {
        try {
            let pessoa = req.body
            pessoa = await database.Pessoas.create(pessoa)
            return res.status(201).send(pessoa)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id
            let pessoa = req.body

            const pessoaDB = await database.Pessoas.findOne({ where: { id }})
            if(!pessoaDB)  
                return res.status(404).json({ message: `Entidade Pessoa de id ${id} não foi encontrado(a)` })

            await database.Pessoas.update(pessoa, { where: { id: Number(id) }})
            return res.status(200).json({ GET: `${baseUrl}/pessoas/${id}` })
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }
    
    static async remove(req, res) {
        try {
            const id = req.params.id
            
            const pessoaDB = await database.Pessoas.findOne({ where: { id }})
            if(!pessoaDB)  
                return res.status(404).json({ message: `Entidade Pessoa de id ${id} não foi encontrado(a)` })
            
            await database.Pessoas.destroy({where: { id }})
            return res.status(200).end()
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }
    
    static async restore(req, res) {
        try {
            const id = req.params.id
            await database.Pessoas.restore({ where: { id }})
            return res.status(200).end()
            
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }


    static async getMatricula(req, res) {
        try {
            const {estudanteId, matriculaId} = req.params

            const matriculaDB = await database.Matriculas
                .findOne({ where: { id: matriculaId, estudante_id: estudanteId } })

            if(!matriculaDB)  
                return res.status(404).json({ message: `Entidade Matrícula de id ${matriculaId} e Id do Estudante ${estudanteId} não foi encontrado(a)` })

            return res.status(200).json(matriculaDB)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async registerMatricula(req, res) {
        try {
            const estudante_id = req.params.estudanteId
            let matricula = {...req.body, estudante_id }
            console.log(matricula);
            
            const turmaDB = await database.Turmas.findOne({ where: { id: matricula.turma_id }})
            if(!turmaDB)
            return res.status(404).json({ message: `A turma de Id ${matricula.turma_id} não encontrada` });
            
            console.log('a');
            const estudanteDB = await database.Pessoas.findOne({ where: { id: Number(matricula.estudante_id) }})
            console.log('b');
            if(!estudanteDB)  
                return res.status(404).json({ message: `Entidade Pessoa de id ${estudante_id} não foi encontrado(a)` })
            
            matricula = await database.Matriculas.create(matricula)
            return res.status(201).send(matricula)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async updateMatricula(req, res) {
        try {
            const estudante_id = req.params.estudanteId
            const id = req.params.matriculaId
            let matricula = { ...req.body, id, estudante_id }

            const turmaDB = await database.Turmas.findOne({ where: { id: matricula.turma_id }})
            if(!turmaDB)
                return res.status(404).json({ message: `A turma de Id ${matricula.turma_id} não existe` });

            const matriculaDB = await database.Matriculas.findOne({ where: { id, estudante_id }})
            if(!matriculaDB)  
                return res.status(404).json({ message: `Entidade Matrícula de id ${id} e Id do Estudante ${estudante_id} não foi encontrado(a)` });

            await database.Matriculas.update(matricula, { where: { id }})
            return res.status(200).json({ GET: `${baseUrl}/pessoas/${estudante_id}/matricula/${id}` })
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async removeMatricula(req, res) {
        try {
            const id = req.params.matriculaId
            const estudante_id = req.params.estudanteId

            const matriculaDB = await database.Matriculas.destroy({ where: { id, estudante_id }})
            if(!matriculaDB) 
                return res.status(404).json({ message: `Entidade Matrícula de id ${id} e Id do Estudante ${estudante_id} não foi encontrado(a)` });

            return res.status(200).end()
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async restoreMatricula(req, res) {
        try {
            const id = req.params.matriculaId
            const estudante_id = req.params.estudanteId

            await database.Pessoas.restore({ where: { id, estudante_id }})
            return res.status(200).end()
            
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }
    
    static async cancelPessoa(req, res) {
        const { estudanteId } = req.params
        try {
            database.sequelize.transaction(async (transacao) => {
                await database.Pessoas.update(
                    { ativo: false }, 
                    { where: { id: estudanteId }}, 
                    { transaction: transacao }
                );
                await database.Matriculas.update(
                    { status: 'cancelado' },
                    { where: { estudante_id: estudanteId }},
                    { transaction: transacao }
                );
                return res.status(200).json({ message: `Matriculas dos estudante de id ${estudanteId} canceladas`})
            });
        } catch(err){
            return res.status(500).json({ message: err.message })
        }
    }   
}

module.exports = PessoaController;