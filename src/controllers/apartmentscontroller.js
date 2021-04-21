const ApartmentModel = require('../models/apartments.model');

//Importación del paquete de generación de pdf
const PDFDocument = require('pdfkit');
const doc = new PDFDocument();

//Importación del paquete csv
const csv = require('fast-csv');

const fs = require('fs');

const Controller = {};

const defineCriteria = (info) => {
    let response = {};
        if (isPriceAndRooms(info)) {
            response = {$and: [{Precio: { $lte: info.maxprice || 1000000, $gte: info.minprice || 0}}, {Habitaciones: info.rooms}]};
        } else if (isOnlyPrice(info)) {
            response = {Precio: { $lte: info.maxprice || 1000000, $gte: info.minprice || 0}};
        } else if (isOnlyRooms(info)) {
            response = {Habitaciones: info.rooms};
        } 
    
    return response;
}

const isPriceAndRooms = (info) => {
    return ((info.maxprice || info.minprice) 
            && info.rooms);
}

const isOnlyPrice = (info) => {
    return (info.maxprice || info.minprice);
}

const isOnlyRooms = (info) => {
    return info.rooms ? true : false;
}

Controller.search = async (req, res) => {
    try {
        const criteria = defineCriteria(req.query);       

        if (Object.keys(criteria).length !== 0) {
            let result = await ApartmentModel.find(criteria);
            //console.log(result);
            res.status(200).render('result',
            {
                message: "Resultado de la búsqueda",
                reply: result,
                decision: true
            });
        } else {
            res.status(400).render('result',
            {
                message: "No ingresó ningún campo",
                reply: [],
                decision: false
            });
        }
    } catch (error) {
        res.status(404).render('result',
        {
            message: "Hubo un error",
            reply: [],
            decision: false
        });
    }
}

Controller.process = async (req, res) => {
    try {
        //Se deben convertir a radianes porque el paquete Math opera en radianes.
        const latitude = Number(req.query.latitude) * Math.PI/180;
        const longitude = Number(req.query.longitude) * Math.PI/180;
        const distance = Number(req.query.distance); 

        const data = await ApartmentModel.find();

        let arrivalLatitude = 0;
        let arrivalLongitude = 0;
        let longitudeDifference = 0;
        let distanceTwoPoints = 0;
        let countApartments = 0;
        let plusPricePerSquareMeter = 0;
        let apartments = [];
        for (const row of data) {
            arrivalLatitude = row.Latitud * Math.PI/180;
            arrivalLongitude = row.Longitud * Math.PI/180;
            longitudeDifference = arrivalLongitude - longitude;

            //Distancia en km, ecuación para el cálculo de la ortodrómica entre dos puntos
            distanceTwoPoints = Math.acos(Math.sin(latitude)*Math.sin(arrivalLatitude) + Math.cos(latitude)*Math.cos(arrivalLatitude)*Math.cos(longitudeDifference))*(180/Math.PI)*111.1;

            if (distanceTwoPoints <= distance) {
                countApartments = countApartments + 1;
                plusPricePerSquareMeter = plusPricePerSquareMeter + row.Precio_por_metro;
                apartments.push(row);
            }
        }

        let meanPricePerSquareMeter = plusPricePerSquareMeter/countApartments;

        res.status(200).render('result', {
            message: "Resultado de la búsqueda",
            value: meanPricePerSquareMeter.toFixed(2),
            reply: apartments
        });

    } catch (error) {
        res.status(404).json({
            message: "Hubo un error",
            err: error 
        });
    }
}

const header = [undefined,
    "Latitud",
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
    "Aire_acondicionado",
    "Piscina",
    "Jardin",
    "Metros_cuadrados_utiles",
    "Apto_para_personas_movilidad_reducida",
    "Plantas",
    "Mascotas_permitidas",
    "Balcon",
    undefined];

Controller.exportsFile = async (req, res) => {
    try {
        if (req.body.type === "pdf") {
            doc.pipe(fs.createWriteStream(__dirname + '/../assets/pdf/reporte.pdf'));
            doc.fontSize(16)
               .font('Times-Bold')
               .text("Resultado de la búsqueda de apartamentos", {
                width: 450,
                align: 'center'
                })
               .moveDown();
            
            for (const row of req.body.data) {
                doc.fontSize(12).font('Times-Roman')
                   .text(`Título: ${row.Titulo} \n
                          Anunciante: ${row.Anunciante} \n
                          Descripción: ${row.Descripcion} \n
                          Teléfono: ${row.Telefonos} \n
                          Tipo de vivienda: ${row.Tipo} \n
                          Precio: ${row.Precio} € \n
                          Dirección: ${row.Direccion} \n
                        `, {
                            width: 450,
                            align: 'center'
                        })
                    .addPage();
            }
            doc.end();

            res.status(200).json({
                message: "Archivo generado con éxito",
            });
        } else if (req.body.type === "csv") {
            const fileCSV = fs.createWriteStream(__dirname + '/../assets/csv/reporte.csv');
            csv.write(req.body.data, {headers: header})
               .pipe(fileCSV);
            
            res.status(200).json({
                message: "Archivo generado con éxito",
            });
        } else {
            res.status(400).json({
                message: "No ingresó un campo correctamente"
            });
        }
    } catch (error) {
        res.status(404).json({
            message: "Hubo un error",
            err: error 
        });
    }
}

module.exports = Controller;