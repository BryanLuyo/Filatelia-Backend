/*
    Ruta: /api/catalogo/anios
*/
const { Router } = require('express');
const { createAnio, getAnio, deleteAnio, updateAnio } = require('../../controllers/catalogo/anio');
const router = Router();

router.get( '/',getAnio );
router.post( '/',createAnio );
router.put('/:id', updateAnio);
router.delete('/:id', deleteAnio);

module.exports = router;