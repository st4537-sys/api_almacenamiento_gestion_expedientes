require("dotenv").config();

const express = require("express");
const conectarDB = require("./src/config/database");


require("./src/models/user"); 
require("./src/models/Expediente"); 


const expedienteRoutes = require("./src/routes/expedienteRoutes");
const userRoutes = require("./src/routes/userRoutes"); // <-- 1. Importamos tus nuevas rutas de usuario

const app = express();
const port = process.env.PORT || 5100;

// Conectar a MongoDB
conectarDB();

// Middleware
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
    res.status(200).json({
        mensaje: "API Almacenamiento Gestión de Expedientes funcionando correctamente",
        estado: "OK"
    });
});

// Rutas de la API
app.use("/api", expedienteRoutes);
app.use("/api/users", userRoutes); // <-- 2. Registramos las rutas de usuarios aquí

// Ruta para errores 404
app.use((req, res) => {
    res.status(404).json({
        mensaje: "Ruta no encontrada"
    });
});

// Exportar para Vercel
module.exports = app;