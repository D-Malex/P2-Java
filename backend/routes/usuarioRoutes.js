const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/UsuarioController');

router.get('', usuarioController.getUsuarios);
router.put('/update', usuarioController.actualizarUsuario);
router.post('/new', usuarioController.createUsuario);
router.post('/news', usuarioController.createUsuarios);
router.get('/emails', usuarioController.obtenerEmails);
router.get('/email/', usuarioController.obtenerUsuarioPorEmail);
router.get('/:id', usuarioController.obtenerUsuarioPorId);
router.get('/rol/:id_rol', usuarioController.obtenerUsuariosPorRol);
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;