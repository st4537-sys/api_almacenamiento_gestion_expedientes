const mongoose = require("mongoose");

const expedienteSchema = new mongoose.Schema({
    nombreArchivo: {
        type: String,
        required: true
    },
    nombreOriginal: {
        type: String,
        required: true
    },
    tipoMime: {
        type: String,
        required: true
    },
    tamaño: {
        type: Number,
        required: true
    },
    rutaArchivo: {
        type: String,
        required: true
    },
    fechaCarga: {
        type: Date,
        default: Date.now
    }
});

// Reemplaza tu module.exports actual por este control de duplicados:
module.exports = mongoose.models.Expediente || mongoose.model("Expediente", expedienteSchema);