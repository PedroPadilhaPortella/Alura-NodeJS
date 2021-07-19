const database = require('../models')
const Service = require("./Service")

class NivelService extends Service {
    constructor() {
        super('Niveis');
    }
}

module.exports = NivelService;