const express = require('express');
const router = express.Router();
const productController = require('../controllers/ventaController');

// Ruta para dos parametros id producto y num. sucursal
router.post('/:ventasId/sucursal/:sucursalId', productController.postVenta);

module.exports = router;