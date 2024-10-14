const redis = require('redis');

// Crear cliente de Redis
const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// Verificar conexion a redis
redisClient.connect().catch(err => {
    console.error('Error al conectar con Redis:', err);
});

redisClient.on('connect', () => {
    console.log('Conectado a Redis');
});

redisClient.on('error', (err) => {
    console.error('Error al conectar con Redis:', err);
});

// Función para obtener los detalles del producto por ID y num sucursal
exports.geoSearch = async (req, res) => {

    const { key, latitude, longitude, km } = req.body;

    try {
        // Usar await para obtener los detalles del producto
        console.log(req.body);

        const nearbyLocations = await redisClient.geoSearch(key, {latitude, longitude}, {radius: km, unit: 'km'});        
        console.log('Nearby locations:', nearbyLocations);

        return res.status(200).json(nearbyLocations);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error al procesar la solicitud', error });
    }
};

// get all clients from the sucursales
exports.getClients = async (req, res) => {
    const { sucursalID } = req.params;
    
    try {
        const key = `sucursal:${sucursalID}:clientes`;
        const clients = await redisClient.SMEMBERS(key);

        console.log('key:', key);

        return res.status(200).json(clients);
        
    } catch (error) {

        console.error('Error:', error);
        return res.status(500).json({ message: 'Error al procesar la solicitud', error });

    }
}


exports.getAllClients = async (req, res) => {
    
    try {

        const multi = redisClient.multi();

        multi.SMEMBERS('sucursal:1111:clientes');
        multi.SMEMBERS('sucursal:2222:clientes');
        multi.SMEMBERS('sucursal:3333:clientes');
        multi.SMEMBERS('sucursal:4444:clientes');

        const result = await multi.exec();

        console.log(result)

        return res.status(200).json(result);
        
    } catch (error) {

        console.error('Error:', error);
        return res.status(500).json({ message: 'Error al procesar la solicitud', error });

    }
}
