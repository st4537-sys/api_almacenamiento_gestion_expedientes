
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contraseña: {
        type: String,
        required: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

// Busca si el modelo 'User' ya fue creado; si no, lo crea.
module.exports = mongoose.models.User || mongoose.model("User", userSchema);