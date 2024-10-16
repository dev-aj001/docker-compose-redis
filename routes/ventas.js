const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

// Ruta para dos parametros id producto y num. sucursal
router.post('/:ventasId/sucursal/:sucursalId', ventaController.postVenta);

module.exports = router;