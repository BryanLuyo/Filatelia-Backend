const { Router } = require('express');
const { getUsuario, createUsuario, updateUusuario, deleteUsuario } = require('../../controllers/usuario/usuario');
const router = Router();

router.get( '/',getUsuario );
router.post('/', createUsuario);
router.put('/:id', updateUusuario);
router.delete('/:id', deleteUsuario);

module.exports = router;