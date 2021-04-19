const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();
const PORT = process.env.PORT || 3002;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

require('./connectionDB');
//require('./uploadData');

//Rutas
const routes = require('./routes');
app.use('/', routes);

app.listen(PORT, () => {
    console.log("Servidor a la espera de conexiones");
});