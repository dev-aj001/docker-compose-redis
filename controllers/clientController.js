const redis = require('redis');

// Crear cliente de Redis
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('connect', () => {
  console.log('Conectado a Redis');
});

redisClient.on('error', (err) => {
  console.error('Error al conectar con Redis:', err);
});

// Verificar la conexion a Redis
(async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (error) {
    console.error('Error al conectar el cliente Redis:', error);
  }
})();

// Función para añadir un nuevo cliente
exports.addNewClient = async (req, res) => {
  const { rfc, nombre, sucursalId } = req.body;

  // Formato para la clave global del cliente y la clave por sucursal
  const clientKey = `cliente:${rfc}:nombre:${nombre}`;
  const sucursalKey = `sucursal:${sucursalId}:clientes`;

  try {
    // Verificar si el cliente ya existe en la lista global
    const isGlobalClient = await redisClient.sIsMember('clientes', clientKey);

    if (isGlobalClient) {
      return res.status(400).json({ message: 'El cliente ya existe globalmente' });
    }

    // Añadir cliente a la lista global
    await redisClient.sAdd('clientes', clientKey);

    // Añadir cliente a la lista de la sucursal
    await redisClient.sAdd(sucursalKey, clientKey);

    return res.status(201).json({ message: 'Cliente añadido exitosamente' });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return res.status(500).json({ message: 'Error al procesar la solicitud', error });
  }
};
