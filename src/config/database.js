const mongoose = require("mongoose");

const conectarDB = async () => {

    const uri = process.env.MONGODB_URI;

    console.log("URI:", uri);

    try {

        await mongoose.connect(uri);

        console.log("MongoDB conectado");

    } catch (error) {

        console.log(error);

    }

}

module.exports = conectarDB;