const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3002;

require('./connectionDB');
//require('./uploadData');

//Rutas
const routes = require('./routes');
app.use('/', routes);

app.listen(PORT, () => {
    console.log("Servidor a la espera de conexiones");
});