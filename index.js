require('dotenv').config();
const express = require('express');
const conectarDB = require("./src/config/database");
conectarDB();

const app = express();
const port = 5100;

app.listen(port, () => {
    console.log("Servidor ejecutandose en el puerto");
});