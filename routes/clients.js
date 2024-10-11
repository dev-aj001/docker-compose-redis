const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Ruta para añadir un nuevo cliente
router.post('/add', clientController.addNewClient);
router.get('/', clientController.getclients);

module.exports = router;