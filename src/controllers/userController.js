const User = require('../models/user'); // Ajusta la ruta según tu estructura de carpetas

// 1. Crear un nuevo usuario (POST)
exports.crearUsuario = async (req, res) => {
    try {
        const { nombre, correo, contraseña } = req.body;

        // Validar si el correo ya existe
        const usuarioExiste = await User.findOne({ correo });
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: "El correo ya está registrado" });
        }

        const nuevoUsuario = new User({ nombre, correo, contraseña });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: "Usuario creado con éxito", usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el usuario", error: error.message });
    }
};

// 2. Obtener todos los usuarios (GET)
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find().select('-contraseña'); // Excluye la contraseña por seguridad
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los usuarios", error: error.message });
    }
};

// 3. Obtener un usuario por ID (GET)
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id).select('-contraseña');
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar el usuario", error: error.message });
    }
};

// 4. Actualizar un usuario (PUT)
exports.actualizarUsuario = async (req, res) => {
    try {
        const { nombre, correo } = req.body;
        
        const usuarioActualizado = await User.findByIdAndUpdate(
            req.params.id,
            { nombre, correo },
            { new: true, runValidators: true } // 'new: true' devuelve el documento ya modificado
        ).select('-contraseña');

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({ mensaje: "Usuario actualizado", usuario: usuarioActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el usuario", error: error.message });
    }
};

// 5. Eliminar un usuario (DELETE)
exports.eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await User.findByIdAndDelete(req.params.id);
        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el usuario", error: error.message });
    }
};