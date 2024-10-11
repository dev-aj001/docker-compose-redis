const express = require('express');
const redis = require('redis');
const dotenv = require('dotenv');

// Import routes
const productRoutes = require('./routes/products');
const clientRoutes = require('./routes/clients');
// const salesRoutes = require('./routes/sales');
// const branchRoutes = require('./routes/branches');

dotenv.config();

const app = express();
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

app.use(express.json());


app.use('/productos', productRoutes);
app.use('/clients', clientRoutes);
// app.use('/sales', salesRoutes);
// app.use('/branches', branchRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));