const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/UsuarioController');

router.get('', usuarioController.getUsuarios);
router.post('/new', usuarioController.createUsuario);
router.post('/news', usuarioController.createUsuarios);
router.put('/update', usuarioController.actualizarUsuario);
router.get('/:id', usuarioController.obtenerUsuarioPorId);
router.get('/rol/:id_rol', usuarioController.obtenerUsuariosPorRol);
router.get('/email/', usuarioController.obtenerUsuarioPorEmail);
router.get('/emails', usuarioController.obtenerEmails);
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;