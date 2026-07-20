const jwt = require("jsonwebtoken");

const payload = {
    app: "api_gestion_expedientes",
    tipo: "application"
};

const token = jwt.sign(
    payload,
    "MiClaveExpedientes2026",
    {
        noTimestamp: true
    }
);

console.log("\nTOKEN DE LA API DE EXPEDIENTES\n");
console.log(token);