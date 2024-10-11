const express = require('express');
const dotenv = require('dotenv');

// Import routes
const productRoutes = require('./routes/products');
const clientRoutes = require('./routes/clients');
const salesRoutes = require('./routes/ventas');
const sucursalRoutes = require('./routes/sucursal');
// const branchRoutes = require('./routes/branches');

dotenv.config();

const app = express();

app.use(express.json());


app.use('/producto', productRoutes);
app.use('/clients', clientRoutes);
app.use('/ventas', salesRoutes);
app.use('/sucursal', sucursalRoutes);
// app.use('/branches', branchRoutes);

module.exports = app;