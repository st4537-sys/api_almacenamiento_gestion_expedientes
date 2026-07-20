const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            mensaje: "Token requerido"
        });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            mensaje: "Formato de token inválido"
        });
    }

    const token = authHeader.split(" ")[1];

    if (token !== process.env.APP_TOKEN) {
        return res.status(401).json({
            mensaje: "Token no autorizado"
        });
    }

    try {

        const datos = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.token = datos;

        next();

    } catch (error) {

        return res.status(401).json({
            mensaje: "Token inválido"
        });

    }

};

module.exports = verificarToken;