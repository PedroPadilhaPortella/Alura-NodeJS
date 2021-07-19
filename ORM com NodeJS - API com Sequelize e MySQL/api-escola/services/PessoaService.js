const database = require('../models')
const Service = require("./Service")

class PessoaService extends Service {
    constructor() {
        super('Pessoas');
        this.matriculaService = new Service('Matriculas')
    }

    async getAllScoped(where = {}, scope) {
        return database[this.model].scope(scope).findAll({ ...where })
    }

    async cancelPessoaAndMatriculas(estudante_id) {
        return database.sequelize.transaction(async (transacao) => {
            await this.update({ ativo: false }, estudante_id, { transaction: transacao })

            await this.matriculaService
                .updateAll({ status: 'cancelado' }, { estudante_id }, { transaction: transacao })
        });
    }
}

module.exports = PessoaService;