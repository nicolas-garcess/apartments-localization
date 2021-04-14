const mongoose = require('mongoose');
const {Schema} = mongoose;

//Esquema del modelo de datos
const ApartSchema = new Schema({
    //Tipos de datos en la colección de la base de datos
    name: String,
    description: String
});

//Modelo de datos, recibe el nombre de la colección de la base de datos y el esquema
const ApartModel = mongoose.model('apartamentos', ApartSchema);

module.exports = ApartModel;