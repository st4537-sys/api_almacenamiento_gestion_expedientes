const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ajusta la ruta

// Rutas para /api/users
router.post('/', userController.crearUsuario);
router.get('/', userController.obtenerUsuarios);

// Rutas para /api/users/:id
router.get('/:id', userController.obtenerUsuarioPorId);
router.put('/:id', userController.actualizarUsuario);
router.delete('/:id', userController.eliminarUsuario);

module.exports = router;