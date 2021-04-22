const UserModel = require('../models/users.model');
const bcrypt = require('bcrypt');
const tokenService = require('../services/token');
//Objeto para las validaciones de los datos ingresados.
const Joi = require('joi');

const controller = {};

controller.sigin = async (req, res) => {
    try {
        let email = req.body.email;
        let user = await UserModel.findOne({email: email}); //Busca el registro por email
        let passwordValid = null;
        if(user) {
            passwordValid = bcrypt.compareSync(req.body.password, user.password);
        }
        if(passwordValid) {
            const token = tokenService.encode(user);
            res.status(200).json({
                auth: true,
                token: token,
                user: user,
                message: "Ingreso correcto"
            });
        } else {
            res.status(400).json({
                auth: false,
                token: null,
                message: "Usuario o contraseña erróneo"
            });
        }
    } catch (error) {
        res.status(404).json({
            auth: false,
            token: null,
            message: "Hubo un error"
        });
    }
};

//Validadciones
const schemaSignUp = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    lastname: Joi.string()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .min(6)
        .max(30)
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    email: Joi.string()
        .min(6)
        .max(100)
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    
    rol: Joi.string()
        .min(3)
        .max(30)
        .required(),
});

controller.signup = async (req, res) => {
    //Ejecuta las validaciones del esquema
    const {error} = schemaSignUp.validate(req.body);
    if (error) {
        //Si hay un error en las valiadaciones retorna un json con el mensaje de error. 
        return res.status(400).json(
            {error: error.details[0].message}
        );
    }

    try {
        let user = await UserModel.findOne({email: req.body.email});
        if(!user) {
            let hash = bcrypt.hashSync(req.body.password, 10); //Encriptación de la contraseña
            req.body.password = hash;
            let newUser = await UserModel.create(req.body);
            res.status(200).json(newUser);
        } else {
            res.status(400).json({
                message: 'El usuario ya existe.'
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Hubo un error'
        });
    }
};

module.exports = controller;