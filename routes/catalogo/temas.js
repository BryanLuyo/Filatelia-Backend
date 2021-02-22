/*
    Ruta: /api/catalogo/temas
*/
const { Router } = require('express');
const { getTemas, createTema, updateTema, deleteTema } = require('../../controllers/catalogo/temas');
const router = Router();

router.get( '/',getTemas);
router.post( '/', createTema);
router.put( '/:id', updateTema);
router.delete( '/:id', deleteTema);
module.exports = router;