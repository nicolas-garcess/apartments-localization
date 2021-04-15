const mongoose = require('mongoose');
const {Schema} = mongoose;

//Esquema del modelo de datos
const ApartSchema = new Schema({
    //Tipos de datos en la colección de la base de datos
    Latitud: String,
    Longitud: String,
    ID: String,
    Titulo: String,
    Anunciante: String,
    Descripcion: String,
    Reformado: String,
    Telefonos: String,
    Tipo: String,
    Precio: String,
    Precio_por_metro: String,
    Direccion: String,
    Provincia: String,
    Ciudad: String,
    Metros_cuadrados: String,
    Habitaciones: String,
    Banos: String,
    Parking: String,
    Segunda_mano: String,
    Armarios_empotrados: String,
    Lugar_construccion: String,
    Amueblado: String,
    Calefaccion_individual: String,
    Certificacion_energetica: String,
    Planta: String,
    Exterior: String,
    Interior: String,
    Ascensor: String,
    Fecha: String,
    Calle: String,
    Barrio: String,
    Distrito: String,
    Terraza: String,
    Trastero: String,
    Cocina_equipada: String,
    Aire_acondicionado: String,
    Piscina: String,
    Jardin: String,
    Metros_cuadrados_utiles: String,
    Apto_para_personas_movilidad_reducida: String,
    Plantas: String,
    Mascotas_permitidas: String,
    Balcon: String,
});

//Modelo de datos, recibe el nombre de la colección de la base de datos y el esquema
const ApartModel = mongoose.model('apartamentos', ApartSchema);

module.exports = ApartModel;