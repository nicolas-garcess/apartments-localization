const jwt = require('jsonwebtoken');
const UserModel = require('../models/users.model');

const tokenVerification = {};

tokenVerification.encode = (user) => {
    const token = jwt.sign({
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        rol: user.rol
      }, process.env.TOKEN_SECRET, { expiresIn: '2h' });

      return token;
}

tokenVerification.decode = async (token) => {
    try {
        const { id } = await jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await UserModel.findOne({
            _id: id,
            active: 1
        });

        if (user) {
            return user;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);        
    }
}

module.exports = tokenVerification;