const database = require('../models')

class Service {
    constructor(model) {
        this.model = model;
    }

    async getAll(where = {}) {
        return database[this.model].findAll({ ...where })
    }
    
    async getById(where) {
        return database[this.model].findOne({ where })
    }

    async create(data) {
        return database[this.model].create(data)
    }

    async update(data, id, transacao = {}) {
        return database[this.model].update(data, { where: { id } }, { transaction: transacao})
    }

    async updateAll(data, where, transacao = {}) {
        return database[this.model].update(data, { where: { ...where } }, { transaction: transacao})
    }

    async delete(where) {
        return database[this.model].destroy({ where })
    }

    async restore(where) {
        return database[this.model].restore({ where })
    }
}

module.exports = Service;