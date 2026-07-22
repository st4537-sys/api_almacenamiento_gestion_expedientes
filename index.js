require("dotenv").config();
const helmet = require('helmet');

const express = require("express");
const conectarDB = require("./src/config/database");

const expedienteRoutes = require("./src/routes/expedienteRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
app.use (helmet());



// Conectar a MongoDB
conectarDB();

// Middleware
app.use(express.json());
const verificarToken = require("./src/middleware/verificarToken");
// Ruta de prueba
app.get("/", (req, res) => {
    res.status(200).json({
        mensaje: "API Almacenamiento Gestión de Expedientes funcionando correctamente",
        estado: "OK"
    });
});

// Rutas de la API
app.use("/api", expedienteRoutes);
app.use("/api/users", userRoutes);

// Ruta para errores 404
app.use((req, res) => {
    res.status(404).json({
        mensaje: "Ruta no encontrada"
    });
});

// Iniciar servidor solo en entorno local
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5100;

    app.listen(PORT, () => {
        console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
    });
}

// Exportar para Vercel
module.exports = app;