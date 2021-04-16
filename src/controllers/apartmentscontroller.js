const ApartmentModel = require('../models/apartments.model');

const Controller = {};

Controller.search = async (req, res) => {
    try {
        const requestResult = req.headers;
        let criteria = {};
        if ((requestResult.maxprice
            || requestResult.minprice)
            && requestResult.rooms) {

                criteria = {$and: [{Precio: { $lte: requestResult.maxprice || 1000000, $gte: requestResult.minprice || 0}}, {Habitaciones: requestResult.rooms}]};

        } else if (requestResult.maxprice
                  || requestResult.minprice) {

                    criteria = {Precio: { $lte: requestResult.maxprice || 1000000, $gte: requestResult.minprice || 0}};

        } else if (requestResult.rooms) {
            
            criteria = {Habitaciones: requestResult.rooms};

        } else {
            res.status(400).json({
                message: "No ingresó ningún campo"
            });
        }
        
        if (Object.keys(criteria).length !== 0) {
            await ApartmentModel.find(criteria)
            .then(r => console.log(r.length))
            .then(() => res.status(200).json({
                message: "Búsqueda exitosa"
            }))
            .catch(e => res.status(404).json(e))
        }
    } catch (error) {
        console.log(error);
    }
}

Controller.process = async (req, res) => {
    try {
        const latitude = req.headers.latitude;
        const longitude = req.headers.longitude;
        const distance = req.distance 


    } catch (error) {
        console.log(error);
    }
}

module.exports = Controller;