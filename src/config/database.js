const mongoose = require("mongoose");

const conectarDB = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_URI);

        console.log(" MongoDB Atlas conectado");

    } catch (error) {

        console.log(error);
        console.log("Error al conectar");

    }

}

module.exports = conectarDB;