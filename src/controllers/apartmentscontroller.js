//Conexión a la base de datos
const connection = require('../db_connection/connection');
//Modelo de la base de datos
const ApartmentModel = require('../models/apartments.model');
const controller = {}

controller.services = async (req, res) => {
    const titleServices = "SERVICIOS EXTERNOS";
    try {
        await connection();

        //Búsqueda de todos los datos de la colección, retorna un array
        const modelServices = await ApartmentModel.find();
        if (modelServices.length !== 0) {
            console.log(modelServices);
        } else {
            console.log("No hay nada");
        }
    } catch (error) {
        console.log(error);
    }
};


module.exports = controller;