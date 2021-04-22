const mongoose = require('mongoose');
const {Schema} = mongoose;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 30
    },
    lastname: {
        type: String,
        required: true,
        min: 3,
        max: 30
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 100
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    rol: {
        type: String,
        required: true,
        min: 3,
        max: 30
    },
    status: {
        type: Number,
        required: true,
        default: 1
    }
});

//Modelo de datos, recibe el nombre de la colección de la base de datos y el esquema
const UserModel = mongoose.model('usuarios', UserSchema);

module.exports = UserModel;