const express = require('express');
const routes = require('./routes');

const port = 3000;
app = express()

routes(app)

app.listen(port, console.log(`App Running at http://localhost:${port}/`))