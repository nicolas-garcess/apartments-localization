const ApartmentModel = require('../models/apartments.model');

const Controller = {};

const defineCriteria = (headers) => {
    let response = {};
        if (isPriceAndRooms(headers)) {
            response = {$and: [{Precio: { $lte: headers.maxprice || 1000000, $gte: headers.minprice || 0}}, {Habitaciones: headers.rooms}]};
        } else if (isOnlyPrice(headers)) {
            response = {Precio: { $lte: headers.maxprice || 1000000, $gte: headers.minprice || 0}};
        } else if (isOnlyRooms(headers)) {
            response = {Habitaciones: headers.rooms};
        } 
    
    return response;
}

const isPriceAndRooms = (headers) => {
    return ((headers.maxprice || headers.minprice) 
            && headers.rooms) 
            ? true : false;
}

const isOnlyPrice = (headers) => {
    return (headers.maxprice || headers.minprice) 
            ? true : false;
}

const isOnlyRooms = (headers) => {
    return headers.rooms ? true : false;
}

Controller.search = async (req, res) => {
    try {
        const criteria = defineCriteria(req.headers);        
        
        if (Object.keys(criteria).length !== 0) {
            ApartmentModel.find(criteria)
            .then((r) => res.status(200).json({
                message: "Búsqueda exitosa",
                quantity: r.length
            }))
            .catch(e => res.status(404).json(e))
        } else {
            res.status(400).json({
                message: "No ingresó ningún campo"
            });
        }
    } catch (error) {
        console.log(error);
    }
}

Controller.process = async (req, res) => {
    try {
        //Se deben convertir a radianes porque el paquete Math opera en radianes.
        const latitude = Number(req.headers.latitude) * Math.PI/180;
        const longitude = Number(req.headers.longitude) * Math.PI/180;
        const distance = Number(req.headers.distance); 

        const data = await ApartmentModel.find();

        let arrivalLatitude = 0;
        let arrivalLongitude = 0;
        let longitudeDifference = 0;
        let distanceTwoPoints = 0;
        let countApartments = 0;
        let plusPricePerSquareMeter = 0;

        for (const row of data) {
            arrivalLatitude = row.Latitud * Math.PI/180;
            arrivalLongitude = row.Longitud * Math.PI/180;
            longitudeDifference = arrivalLongitude - longitude;

            //Distancia en km, ecuación para el cálculo de la ortodrómica entre dos puntos
            distanceTwoPoints = Math.acos(Math.sin(latitude)*Math.sin(arrivalLatitude) + Math.cos(latitude)*Math.cos(arrivalLatitude)*Math.cos(longitudeDifference))*(180/Math.PI)*111.1;

            if (distanceTwoPoints <= distance) {
                countApartments = countApartments + 1;
                plusPricePerSquareMeter = plusPricePerSquareMeter + row.Precio_por_metro;
            }
        }

        let meanPricePerSquareMeter = plusPricePerSquareMeter/countApartments;

        res.status(200).json({
            message: "Consulta con éxito",
            value: meanPricePerSquareMeter.toFixed(2)
        });

    } catch (error) {
        console.log(error);
    }
}

Controller.exportsFile = (req, res) => {

}

module.exports = Controller;