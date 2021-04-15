//Conexión a la base de datos
const connection = require('../db_connection/connection');

//Paquete de csv-parser
// const csv = require('csv-parser');
const csv = require('fast-csv');
const fs = require('fs');

//Modelo de la base de datos
const ApartmentModel = require('../models/apartments.model');
const controller = {};

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

function dataMining() {
    let data = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(__dirname + '/../assets/csv/resource_accommodation.csv')
        .pipe(csv.parse({headers: header, skipRows: 1}))
        .on('data', (row) => data.push(row))
        .on('error', e => reject(e))
        .on('end', () => {
            resolve(data);        
        });
    })      
}


controller.services = async (req, res) => {
    try {
        await connection();

        //Búsqueda de todos los datos de la colección, retorna un array
        const modelServices = await ApartmentModel.find();
        if (modelServices.length !== 0) {
            console.log(modelServices);
        } else {
            let result = await dataMining();
            console.log(result);
            await ApartmentModel.create(result)
            .then(() => {
                res.status(201).json({
                    message: "Datos cargados con éxito"
                });
            })
            .catch(e => res.status(400).json(e))
        }          
    } catch (error) {
        console.log(error);
    }
};


module.exports = controller;