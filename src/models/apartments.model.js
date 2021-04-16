const mongoose = require('mongoose');
const {Schema} = mongoose;

//Esquema del modelo de datos
const ApartSchema = new Schema({
    //Tipos de datos en la colección de la base de datos
    Latitud: {type: Number},
    Longitud: {type: Number},
    ID: {type: String},
    Titulo: {type: String},
    Anunciante: {type: String},
    Descripcion: {type: String},
    Reformado: {type: String},
    Telefonos: {type: String},
    Tipo: {type: String},
    Precio: {type: Number},
    Precio_por_metro: {type: Number},
    Direccion: {type: String},
    Provincia: {type: String},
    Ciudad: {type: String},
    Metros_cuadrados: {type: Number},
    Habitaciones: {type: Number},
    Banos: {type: Number},
    Parking: {type: String},
    Segunda_mano: {type: String},
    Armarios_empotrados: {type: String},
    Lugar_construccion: {type: String},
    Amueblado: {type: String},
    Calefaccion_individual: {type: String},
    Certificacion_energetica: {type: String},
    Planta: {type: String},
    Exterior: {type: String},
    Interior: {type: String},
    Ascensor: {type: String},
    Fecha: {type: String},
    Calle: {type: String},
    Barrio: {type: String},
    Distrito: {type: String},
    Terraza: {type: String},
    Trastero: {type: String},
    Cocina_equipada: {type: String},
    Aire_acondicionado: {type: String},
    Piscina: {type: String},
    Jardin: {type: String},
    Metros_cuadrados_utiles: {type: Number},
    Apto_para_personas_movilidad_reducida: {type: String},
    Plantas: {type: String},
    Mascotas_permitidas: {type: String},
    Balcon: {type: String},
});

//Modelo de datos, recibe el nombre de la colección de la base de datos y el esquema
const ApartModel = mongoose.model('apartamentos', ApartSchema);

module.exports = ApartModel;