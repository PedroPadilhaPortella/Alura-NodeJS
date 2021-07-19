const database = require('../models')
const Sequelize = require('sequelize')
const Service = require("./Service")

class MatriculaService extends Service {
    constructor() {
        super('Matriculas');
    }

    async getAllAndCount(where, agregate) {
        return database[this.model].findAndCountAll({ where, ...agregate })
    }
}

module.exports = MatriculaService;