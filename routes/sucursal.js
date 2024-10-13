const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController');

// Ruta para dos parametros id producto y num. sucursal
router.get('/geoRadius', sucursalController.geoSearch);
router.get('/:sucursalID/clientes', sucursalController.getClients);

module.exports = router;