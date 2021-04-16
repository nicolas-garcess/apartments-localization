//Paquete de fast-csv
const csv = require('fast-csv');
const fs = require('fs');

//Modelo de la base de datos
const ApartmentModel = require('./models/apartments.model');

//Nombre reemplazantes de las cabeceras de las datos de la colección. undefined porque esa cabecera está repetida.
const header = ["Latitud",
    "Longitud",
    "ID",
    "Titulo",
    "Anunciante",
    "Descripcion",
    "Reformado",
    "Telefonos",
    "Tipo",
    "Precio",
    "Precio_por_metro",
    "Direccion",
    "Provincia",
    "Ciudad",
    "Metros_cuadrados",
    "Habitaciones",
    "Banos",
    "Parking",
    "Segunda_mano",
    "Armarios_empotrados",
    "Lugar_construccion",
    "Amueblado",
    "Calefaccion_individual",
    "Certificacion_energetica",
    "Planta",
    "Exterior",
    "Interior",
    "Ascensor",
    "Fecha",
    "Calle",
    "Barrio",
    "Distrito",
    "Terraza",
    "Trastero",
    "Cocina_equipada",
    undefined,
    "Aire_acondicionado",
    "Piscina",
    "Jardin",
    "Metros_cuadrados_utiles",
    "Apto_para_personas_movilidad_reducida",
    "Plantas",
    "Mascotas_permitidas",
    "Balcon"]

//Parseo de los datos del csv a un array.
function dataMining() {
    let data = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(__dirname + '/./assets/csv/resource_accommodation.csv')
        .pipe(csv.parse({headers: header, skipRows: 1}))
        .on('data', (row) => data.push(row))
        .on('error', e => reject(e))
        .on('end', () => {
            resolve(data);        
        });
    })      
}

//Función para buscar si existen datos en la colección, de no ser así, ingresa los datos parseados del csv a la colección en mongodb
const services = async (req, res) => {
    try {
        //Búsqueda de todos los datos de la colección, retorna un array
        const modelServices = await ApartmentModel.find();
        if (modelServices.length !== 0) {
            console.log("Colección existente");
        } else {
            let result = await dataMining();
            await ApartmentModel.create(result);
        }          
    } catch (error) {
        console.log(error);
    }
};

services();