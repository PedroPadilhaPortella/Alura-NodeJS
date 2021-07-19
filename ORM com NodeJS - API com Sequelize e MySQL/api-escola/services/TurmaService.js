const database = require('../models')
const Service = require("./Service")

class TurmaService extends Service {
    constructor() {
        super('Turmas');
    }
}

module.exports = TurmaService;