/*
    Ruta: /api/catalogo/paises
*/
const { Router } = require('express');
const { getPais, createPais, updatePais, deletePais } = require('../../controllers/catalogo/pais');
const router = Router();

router.get( '/',getPais );
router.post('/',createPais);
router.put('/:id', updatePais)
router.delete('/:id', deletePais)
module.exports = router;