const bodyParser = require('body-parser')

const pessoasRoute = require("./pessoasRoute")
const niveisRoute = require("./niveisRoute")
const turmasRoute = require("./turmasRoute")

module.exports = app => {
    app.use(bodyParser.json()/*, pessoasRoute, niveisRoute, turmasRoute, matriculasRoute*/);

    app.get('/', (req, res) => res.send("Connected"));
    
    app.use(pessoasRoute)
    app.use(niveisRoute)
    app.use(turmasRoute)
}