const baseUrl = require('../environmet')
const Sequelize = require('sequelize')
const { PessoaService, MatriculaService, TurmaService } = require('../services')

const pessoaService = new PessoaService()
const matriculaService = new MatriculaService()
const turmaService = new TurmaService()

class PessoaController {
 
    static async getAll(req, res) {
        try {
            const pessoas = await pessoaService.getAll()
            return res.status(200).json(pessoas)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async getAllActive(req, res) {
        try {
            const pessoas = await pessoaService.getAllScoped({}, 'active')
            return res.status(200).json(pessoas)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async getById(req, res) {
        try {
            const id = req.params.id
            const pessoa = await pessoaService.getById(id)
            if(!pessoa)  
                return res.status(404).json({ message: `Entidade Pessoa de id ${id} não foi encontrado(a)` })
            return res.status(200).json(pessoa)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async getMatriculas(req, res) {
        try {
            const id = req.params.id

            const estudante = await pessoaService.getById({id})
            if(!estudante)  
                return res.status(404)
                    .json({ message: `Estudante de id ${id} não foi encontrado(a)` })

            const matriculas = await estudante.getAulasMatriculadas()

            return res.status(200).json(matriculas)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async getMatriculasByTurma(req, res) {
        try {
            const turma_id = req.params.turmaId

            const matriculas = await matriculaService.getAllAndCount(
                { turma_id, status: 'confirmado' },
                { limit: 20,  order: [[ 'estudante_id', 'ASC' ]] }
            )

            return res.status(200).json(matriculas)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async getTurmasLotadas(req, res) {
        const lotacao = req.query.lotacao ? req.query.lotacao : 50
        try {
            const turmasLotadas = await matriculaService.getAllAndCount(
                { status: 'confirmado'},
                {   
                    attributes: ['turma_id'], 
                    group: ['turma_id'], 
                    having: Sequelize.literal(`count(turma_id) >= ${lotacao}`) 
                }
            )
            return res.status(200).json(turmasLotadas.count)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async getMatricula(req, res) {
        try {
            const {estudanteId, matriculaId} = req.params

            const matriculaDB = await matriculaService
                .getById({ estudante_id: estudanteId, id: matriculaId})

            if(!matriculaDB)  
                return res.status(404).json({ message: `Entidade Matrícula de id ${matriculaId} e Id do Estudante ${estudanteId} não foi encontrado(a)` })

            return res.status(200).json(matriculaDB)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async save(req, res) {
        try {
            let pessoa = req.body
            pessoa = await pessoaService.create(pessoa)
            return res.status(201).send(pessoa)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id
            let pessoa = req.body

            const pessoaDB = await pessoaService.getById(id)
            if(!pessoaDB)  
                return res.status(404).json({ message: `Entidade Pessoa de id ${id} não foi encontrado(a)` })

            await pessoaService.update(pessoa, id)
            return res.status(200).json({ GET: `${baseUrl}/pessoas/${id}` })
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }
    
    static async remove(req, res) {
        try {
            const id = req.params.id
            
            const pessoaDB = await pessoaService.getById(id)
            if(!pessoaDB)  
                return res.status(404).json({ message: `Entidade Pessoa de id ${id} não foi encontrado(a)` })
            
            await pessoaService.delete({id})
            return res.status(200).end()
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }
    
    static async restore(req, res) {
        try {
            const id = req.params.id
            await pessoaService.restore({id})
            return res.status(200).end()
            
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async saveMatricula(req, res) {
        try {
            const estudante_id = req.params.estudanteId
            let matricula = {...req.body, estudante_id }
            console.log(matricula);
            
            const turmaDB = await turmaService.getById({ id: matricula.turma_id })
            if(!turmaDB)
                return res.status(404)
                    .json({message: `A turma de Id ${matricula.turma_id} não encontrada`});
            
            const estudanteDB = await pessoaService.getById({ id: matricula.estudante_id })
            if(!estudanteDB) 
                return res.status(404)
                    .json({message: `Entidade Pessoa de id ${estudante_id} não foi encontrado(a)`})
            
            matricula = await matriculaService.create(matricula)
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

            const turmaDB = await turmaService.getById({ id: matricula.turma_id })
            if(!turmaDB)
                return res.status(404).json({ message: `A turma de Id ${matricula.turma_id} não existe` });

            const matriculaDB = await pessoaService.getById({ id: matricula.estudante_id })
            if(!matriculaDB)  
                return res.status(404).json({ message: `Entidade Matrícula de id ${id} e Id do Estudante ${estudante_id} não foi encontrado(a)` });

            await matriculaService.update(matricula, id)
            return res.status(200).json({ GET: `${baseUrl}/pessoas/${estudante_id}/matriculas/${id}` })
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async removeMatricula(req, res) {
        try {
            const { estudante, matricula} = req.params

            const matriculaDB = await matriculaService
                .delete({ id: matricula, estudante_id: estudante})
            if(!matriculaDB) 
                return res.status(404).json({ message: `Entidade Matrícula de id ${id} e Id do Estudante ${estudante_id} não foi encontrado(a)` });

            return res.status(200).end()
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async restoreMatricula(req, res) {
        try {
            const {estudante, matricula} = req.params

            await matriculaService.restore({id: matricula, estudante_id: estudante})
            return res.status(200).end()
            
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }
    
    static async cancelPessoa(req, res) {
        const { estudanteId } = req.params
        try {
            await pessoaService.cancelPessoaAndMatriculas(estudanteId)
            return res.status(200).json({ message: `Matriculas dos estudante de id ${estudanteId} canceladas`})
        } catch(err){
            return res.status(500).json({ message: err.message })
        }
    }   
}

module.exports = PessoaController;