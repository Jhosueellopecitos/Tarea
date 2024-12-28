let express = require('express');
let router = express.Router();
let cancionController = require('../controller/cancionController')

router.get('/', (req, res) => {
    res.status(304).send("Hello Moto");
});

router.post('/', cancionController.agregarCancion);
router.get('/random', cancionController.obtenerCancionAleatoria); 
router.get('/list', cancionController.obtenerListaCanciones);
router.post('/vote', cancionController.votarCancion);
module.exports = router;