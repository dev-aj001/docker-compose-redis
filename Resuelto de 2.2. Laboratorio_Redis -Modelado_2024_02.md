1. Considere el caso de una empresa mayorista de materiales de construcción. Todas las ventas que hace una sucursal implica la emisión de una factura. A la empresa le interesan los siguientes aspectos:  
   1. **Productos**. Datos de los productos a la venta (código (ID), descripción, precio, categoría y datos adicionales en caso de haberlos)  
   2. **Clientes**. Datos del cliente RFC, nombre o razón social.  
   3. **Ventas**. Registro de las ventas realizadas en cada sucursal y a que cliente  
   4. **Sucursal**. Ubicación geográfica de cada una de las sucursales. Cada sucursal tiene un número de sucursal y un nombre  
   5. **Sucursal-clientes**. Registro histórico de los clientes que han hecho compras en cada sucursal  
2. Utilice las siguientes estructuras de datos  
   1. **HASH**  
   2. **LIST**   
   3. **GEO**  
   4. **STRING**  
3. El conjunto de querys a resolver en el escenario implican lo siguiente:  
   1. **Q1**. Obtener los detalles de un producto dado su ID.  
   2. **Q2**. Añadir un nuevo cliente al conjunto de clientes de una sucursal y verificar que no exista previamente.  
   3. **Q3**.  Registrar una nueva venta para un cliente en específico.  
   4. **Q4**. Buscar sucursales cercanas a una ubicación geográfica específica usando consultas geoespaciales.  
   5. **Q5**. Obtener el conjunto de clientes que han comprado en una sucursal específica.   
   6. **Q6**. Registro histórico de los clientes que han hecho compras en cada sucursal  
4. Escenario de datos debe contener lo siguiente:  
   1. 5 Sucursales  
   2. 5 Productos por sucursal (diferentes)  
   3. 5 Compras por sucursal  
   4. 5 Clientes por sucursal  
5. Iniciar un contenedor redis/redis-stack con persistencia
   ```
   docker run -d \
   --name redis01 \
   -p 6379:6379 -p 8001:8001 \
   -v /home/user/Documents/redis_data:/data \
   redis/redis-stack:latest
   ```
   ```
   http://localhost:8001
   ```
   
   
6. **Sucursales.** Estructura de tipo String con JSON para almacenar código de la sucursal, dirección (calle y numero), email, y celular

   ```
   MULTI
   SET sucursal:1111 '{"codigo": 1111, "direccion": "Calle Hidalgo 123, Tepic, Nayarit", "email": "contacto1111@sucursales.com", "celular": "3111234567", "latitud": "21.5107", "longitud": "-104.8946"}'
   SET sucursal:2222 '{"codigo": 2222, "direccion": "Av. Insurgentes 456, Tepic, Nayarit", "email": "contacto2222@sucursales.com", "celular": "3117654321", "latitud": "21.5011", "longitud": "-104.8941"}'
   SET sucursal:3333 '{"codigo": 3333, "direccion": "Blvd. Tepic 789, Xalisco, Nayarit", "email": "contacto3333@sucursales.com", "celular": "3119876543", "latitud": "21.4441", "longitud": "-104.8735"}'
   SET sucursal:4444 '{"codigo": 4444, "direccion": "Calle México 321, Santiago, Nayarit", "email": "contacto4444@sucursales.com", "celular": "3116547890", "latitud": "21.1748", "longitud": "-105.2277"}'
   SET sucursal:5555 '{"codigo": 5555, "direccion": "Av. Principal 654, Compostela, Nayarit", "email": "contacto5555@sucursales.com", "celular": "3114321987", "latitud": "21.2373", "longitud": "-105.0905"}'
   EXEC
   ```

   ```
   MULTI
   GEOADD sucursales_geopos -104.8946 21.5107 "sucursal:1111"
   GEOADD sucursales_geopos -104.8941 21.5011 "sucursal:2222"
   GEOADD sucursales_geopos -104.8735 21.4441 "sucursal:3333"
   GEOADD sucursales_geopos -105.2277 21.1748 "sucursal:4444"
   GEOADD sucursales_geopos -105.0905 21.2373 "sucursal:5555"
   EXEC
   ```


7. **Productos**. Estructura de tipo Hash que contempla la sucursal donde el producto está siendo ofrecido a la venta, nombre del producto, precio y categoría del producto.
   ```
   MULTI
   HSET producto:1001:sucursal:1111 nombre "Cemento" precio 200 categoria "Material de Construcción"
   HSET producto:1002:sucursal:1111 nombre "Arena" precio 50 categoria "Material de Construcción"
   HSET producto:1003:sucursal:1111 nombre "Grava" precio 60 categoria "Material de Construcción"
   HSET producto:1004:sucursal:1111 nombre "Bloque" precio 15 categoria "Material de Construcción"
   HSET producto:1005:sucursal:1111 nombre "Varilla" precio 150 categoria "Material de Construcción"

   HSET producto:1001:sucursal:2222 nombre "Cemento" precio 200 categoria "Material de Construcción"
   HSET producto:1002:sucursal:2222 nombre "Cal" precio 30 categoria "Material de Construcción"
   HSET producto:1003:sucursal:2222 nombre "Tubos PVC" precio 80 categoria "Fontanería"
   HSET producto:1004:sucursal:2222 nombre "Clavos" precio 10 categoria "Ferretería"
   HSET producto:1005:sucursal:2222 nombre "Tornillos" precio 12 categoria "Ferretería"

   HSET producto:1001:sucursal:3333 nombre "Ladrillo" precio 5 categoria "Material de Construcción"
   HSET producto:1002:sucursal:3333 nombre "Tubería de cobre" precio 100 categoria "Fontanería"
   HSET producto:1003:sucursal:3333 nombre "Puerta de madera" precio 500 categoria "Carpintería"
   HSET producto:1004:sucursal:3333 nombre "Ventana de aluminio" precio 700 categoria "Carpintería"
   HSET producto:1005:sucursal:3333 nombre "Cemento blanco" precio 250 categoria "Material de Construcción"

   HSET producto:1001:sucursal:4444 nombre "Arena gruesa" precio 60 categoria "Material de Construcción"
   HSET producto:1002:sucursal:4444 nombre "Mortero" precio 120 categoria "Material de Construcción"
   HSET producto:1003:sucursal:4444 nombre "Grava fina" precio 55 categoria "Material de Construcción"
   HSET producto:1004:sucursal:4444 nombre "Clavos de acero" precio 15 categoria "Ferretería"
   HSET producto:1005:sucursal:4444 nombre "Tubería galvanizada" precio 200 categoria "Fontanería"

   HSET producto:1001:sucursal:5555 nombre "Pintura blanca" precio 500 categoria "Pinturas"
   HSET producto:1002:sucursal:5555 nombre "Pintura negra" precio 450 categoria "Pinturas"
   HSET producto:1003:sucursal:5555 nombre "Yeso" precio 100 categoria "Material de Construcción"
   HSET producto:1004:sucursal:5555 nombre "Taladro" precio 800 categoria "Herramientas"
   HSET producto:1005:sucursal:5555 nombre "Sierra eléctrica" precio 1500 categoria "Herramientas"
   EXEC
   ```

8. **Clientes**. Los clientes aparecen en un conjunto. Son los clientes que se han registrado en la plataforma de la cadena
   ```
   MULTI
   SADD clientes "cliente:RFC12345:nombre:'Juan Perez'"
   SADD clientes "cliente:RFC54321:nombre:'Maria Gomez'"
   SADD clientes "cliente:RFC67890:nombre:'Carlos Ramirez'"
   SADD clientes "cliente:RFC09876:nombre:'Ana Martinez'"
   SADD clientes "cliente:RFC23456:nombre:'Luis Hernandez'"
   SADD clientes "cliente:RFC65432:nombre:'Gabriela Torres'"
   SADD clientes "cliente:RFC78901:nombre:'Jose Vargas'"
   SADD clientes "cliente:RFC10987:nombre:'Carmen Ponce'"
   SADD clientes "cliente:RFC34567:nombre:'Fernando Lopez'"
   SADD clientes "cliente:RFC76543:nombre:'Daniela Moreno'"
   SADD clientes "cliente:RFC89012:nombre:'Miguel Ortiz'"
   SADD clientes "cliente:RFC21098:nombre:'Sofia Sanchez'"
   SADD clientes "cliente:RFC45678:nombre:'Andres Suarez'"
   SADD clientes "cliente:RFC87654:nombre:'Lucia Gutierrez'"
   SADD clientes "cliente:RFC90123:nombre:'Alberto Flores'"
   SADD clientes "cliente:RFC32109:nombre:'Julieta Rivas'"
   SADD clientes "cliente:RFC56789:nombre:'Ricardo Mendoza'"
   SADD clientes "cliente:RFC98765:nombre:'Elena Castillo'"
   SADD clientes "cliente:RFC01234:nombre:'Pablo Cruz'"
   SADD clientes "cliente:RFC43210:nombre:'Claudia Vega'"
   SADD clientes "cliente:RFC67891:nombre:'David Figueroa'"
   SADD clientes "cliente:RFC19876:nombre:'Adriana Delgado'"
   SADD clientes "cliente:RFC34568:nombre:'Mauricio Espinoza'"
   SADD clientes "cliente:RFC76544:nombre:'Beatriz Aguilar'"
   SADD clientes "cliente:RFC89013:nombre:'Esteban Roldan'"
   EXEC
   ```  
 

9. **Ventas**. Una venta tiene un código de venta: una sucursal, cliente, y productos. Una venta puede tener varios productos y por tanto varias entradas en la lista, por ejemplo:
    ```
    MULTI

    RPUSH sucursal:1111:ventas:2024 "VENTA:10123:PRODUCTO:1003:CANTIDAD:2:COSTO_UNITARIO:60:TOTAL:120:CLIENTE:RFC12345:SUCURSAL:1111:FECHA:20240922:HORA:123456"
    RPUSH sucursal:1111:ventas:2024 "VENTA:10123:PRODUCTO:1005:CANTIDAD:3:COSTO_UNITARIO:150:TOTAL:450:CLIENTE:RFC12345:SUCURSAL:1111:FECHA:20240922:HORA:123457"
    RPUSH sucursal:1111:ventas:2024 "VENTA:10124:PRODUCTO:1001:CANTIDAD:5:COSTO_UNITARIO:200:TOTAL:1000:CLIENTE:RFC56789:SUCURSAL:1111:FECHA:20240923:HORA:123458"
    RPUSH sucursal:1111:ventas:2024 "VENTA:10125:PRODUCTO:1004:CANTIDAD:1:COSTO_UNITARIO:250:TOTAL:250:CLIENTE:RFC89123:SUCURSAL:1111:FECHA:20240924:HORA:123459"
    RPUSH sucursal:1111:ventas:2024 "VENTA:10126:PRODUCTO:1002:CANTIDAD:10:COSTO_UNITARIO:50:TOTAL:500:CLIENTE:RFC45612:SUCURSAL:1111:FECHA:20240925:HORA:123500"

    RPUSH sucursal:2222:ventas:2024 "VENTA:10200:PRODUCTO:1007:CANTIDAD:2:COSTO_UNITARIO:75:TOTAL:150:CLIENTE:RFC16161:SUCURSAL:2222:FECHA:20240922:HORA:123501"
    RPUSH sucursal:2222:ventas:2024 "VENTA:10201:PRODUCTO:1008:CANTIDAD:4:COSTO_UNITARIO:100:TOTAL:400:CLIENTE:RFC20202:SUCURSAL:2222:FECHA:20240922:HORA:123502"
    RPUSH sucursal:2222:ventas:2024 "VENTA:10202:PRODUCTO:1010:CANTIDAD:1:COSTO_UNITARIO:300:TOTAL:300:CLIENTE:RFC99000:SUCURSAL:2222:FECHA:20240923:HORA:123503"
    RPUSH sucursal:2222:ventas:2024 "VENTA:10203:PRODUCTO:1001:CANTIDAD:3:COSTO_UNITARIO:200:TOTAL:600:CLIENTE:RFC11223:SUCURSAL:2222:FECHA:20240924:HORA:123504"
    RPUSH sucursal:2222:ventas:2024 "VENTA:10204:PRODUCTO:1005:CANTIDAD:7:COSTO_UNITARIO:150:TOTAL:1050:CLIENTE:RFC99000:SUCURSAL:2222:FECHA:20240925:HORA:123505"

    RPUSH sucursal:3333:ventas:2024 "VENTA:10300:PRODUCTO:1011:CANTIDAD:1:COSTO_UNITARIO:500:TOTAL:500:CLIENTE:RFC33445:SUCURSAL:3333:FECHA:20240922:HORA:123506"
    RPUSH sucursal:3333:ventas:2024 "VENTA:10301:PRODUCTO:1006:CANTIDAD:5:COSTO_UNITARIO:100:TOTAL:500:CLIENTE:RFC70707:SUCURSAL:3333:FECHA:20240923:HORA:123507"
    RPUSH sucursal:3333:ventas:2024 "VENTA:10302:PRODUCTO:1012:CANTIDAD:2:COSTO_UNITARIO:250:TOTAL:500:CLIENTE:RFC13131:SUCURSAL:3333:FECHA:20240924:HORA:123508"
    RPUSH sucursal:3333:ventas:2024 "VENTA:10303:PRODUCTO:1009:CANTIDAD:1:COSTO_UNITARIO:600:TOTAL:600:CLIENTE:RFC30303:SUCURSAL:3333:FECHA:20240925:HORA:123509"
    RPUSH sucursal:3333:ventas:2024 "VENTA:10304:PRODUCTO:1004:CANTIDAD:3:COSTO_UNITARIO:250:TOTAL:750:CLIENTE:RFC55667:SUCURSAL:3333:FECHA:20240926:HORA:123510"

    RPUSH sucursal:4444:ventas:2024 "VENTA:10400:PRODUCTO:1013:CANTIDAD:2:COSTO_UNITARIO:120:TOTAL:240:CLIENTE:RFC80808:SUCURSAL:4444:FECHA:20240922:HORA:123511"
    RPUSH sucursal:4444:ventas:2024 "VENTA:10401:PRODUCTO:1010:CANTIDAD:3:COSTO_UNITARIO:300:TOTAL:900:CLIENTE:RFC40404:SUCURSAL:4444:FECHA:20240923:HORA:123512"
    RPUSH sucursal:4444:ventas:2024 "VENTA:10402:PRODUCTO:1002:CANTIDAD:4:COSTO_UNITARIO:50:TOTAL:200:CLIENTE:RFC77889:SUCURSAL:4444:FECHA:20240924:HORA:123513"
    RPUSH sucursal:4444:ventas:2024 "VENTA:10403:PRODUCTO:1014:CANTIDAD:1:COSTO_UNITARIO:1000:TOTAL:1000:CLIENTE:RFC14141:SUCURSAL:4444:FECHA:20240925:HORA:123514"
    RPUSH sucursal:4444:ventas:2024 "VENTA:10404:PRODUCTO:1005:CANTIDAD:6:COSTO_UNITARIO:150:TOTAL:900:CLIENTE:RFC40404:SUCURSAL:4444:FECHA:20240926:HORA:123515"

    RPUSH sucursal:5555:ventas:2024 "VENTA:10500:PRODUCTO:1007:CANTIDAD:2:COSTO_UNITARIO:75:TOTAL:150:CLIENTE:RFC78987:SUCURSAL:5555:FECHA:20240922:HORA:123516"
    RPUSH sucursal:5555:ventas:2024 "VENTA:10501:PRODUCTO:1004:CANTIDAD:1:COSTO_UNITARIO:250:TOTAL:250:CLIENTE:RFC50505:SUCURSAL:5555:FECHA:20240923:HORA:123517"
    RPUSH sucursal:5555:ventas:2024 "VENTA:10502:PRODUCTO:1015:CANTIDAD:5:COSTO_UNITARIO:600:TOTAL:3000:CLIENTE:RFC15151:SUCURSAL:5555:FECHA:20240924:HORA:123518"
    RPUSH sucursal:5555:ventas:2024 "VENTA:10503:PRODUCTO:1009:CANTIDAD:2:COSTO_UNITARIO:600:TOTAL:1200:CLIENTE:RFC90909:SUCURSAL:5555:FECHA:20240925:HORA:123519"
    RPUSH sucursal:5555:ventas:2024 "VENTA:10504:PRODUCTO:1005:CANTIDAD:4:COSTO_UNITARIO:150:TOTAL:600:CLIENTE:RFC90909:SUCURSAL:5555:FECHA:20240926:HORA:123520"
    EXEC
    ```
10. **Sucursal-clientes**. Estructura de tipo set. Son los clientes que han realizado compras en las sucursales en específico


    ```
    MULTI
    SADD sucursal:1111:clientes "cliente:RFC12345:nombre:'Juan Perez'"
    SADD sucursal:1111:clientes "cliente:RFC67890:nombre:'Maria Lopez'"
    SADD sucursal:1111:clientes "cliente:RFC45654:nombre:'Sandra Vega'"
    SADD sucursal:1111:clientes "cliente:RFC10101:nombre:'Fernando Soto'"
    SADD sucursal:1111:clientes "cliente:RFC60606:nombre:'Lucia Delgado'"
    SADD sucursal:1111:clientes "cliente:RFC17171:nombre:'Raul Castro'"

    SADD sucursal:2222:clientes "cliente:RFC11223:nombre:'Carlos Ramirez'"
    SADD sucursal:2222:clientes "cliente:RFC99000:nombre:'Diana Torres'"
    SADD sucursal:2222:clientes "cliente:RFC20202:nombre:'Isabel Ortiz'"
    SADD sucursal:2222:clientes "cliente:RFC16161:nombre:'Sofia Ruiz'"

    SADD sucursal:3333:clientes "cliente:RFC33445:nombre:'Luis Hernandez'"
    SADD sucursal:3333:clientes "cliente:RFC55667:nombre:'Ana Gomez'"
    SADD sucursal:3333:clientes "cliente:RFC30303:nombre:'Alberto Vargas'"
    SADD sucursal:3333:clientes "cliente:RFC70707:nombre:'Manuel Cruz'"
    SADD sucursal:3333:clientes "cliente:RFC13131:nombre:'Roberto Palacios'"

    SADD sucursal:4444:clientes "cliente:RFC77889:nombre:'Pablo Martinez'"
    SADD sucursal:4444:clientes "cliente:RFC40404:nombre:'Monica Pineda'"
    SADD sucursal:4444:clientes "cliente:RFC80808:nombre:'Gloria Navarro'"
    SADD sucursal:4444:clientes "cliente:RFC14141:nombre:'Victor Garcia'"

    SADD sucursal:5555:clientes "cliente:RFC12321:nombre:'Jose Fernandez'"
    SADD sucursal:5555:clientes "cliente:RFC78987:nombre:'Andrea Rios'"
    SADD sucursal:5555:clientes "cliente:RFC50505:nombre:'Pedro Sanchez'"
    SADD sucursal:5555:clientes "cliente:RFC90909:nombre:'Marcos Fuentes'"
    SADD sucursal:5555:clientes "cliente:RFC15151:nombre:'Rosa Mendoza'"

    EXEC
    ```

11. **Q1**. Obtener los detalles de un producto dado su ID. El modelado con HASH para los productos es conveniente porque permite almacenar múltiples atributos (nombre, precio, categoría, etc.) de un producto y recuperarlos eficientemente con HGETALL o atributos específicos con HGET.
    ```
    HGETALL producto:1001:sucursal:1111
    ```
    
12. **Q2**. Añadir un nuevo cliente al conjunto de clientes de una sucursal y verificar que no exista previamente. El modelado con  SET para los clientes de cada sucursal es adecuado ya que garantiza la unicidad de los valores y permite agregar o verificar la existencia de un cliente de manera eficiente.
    ```
    SISMEMBER sucursal:1111:clientes "cliente:RFC23456:nombre:'Luis Fernandez'"
    SADD sucursal:1111:clientes "cliente:RFC23456:nombre:'Luis Fernandez'"
    SADD sucursal:2222:clientes "cliente:RFC11223:nombre:'Carlos Ramirez'"
    SADD sucursal:4444:clientes "cliente:RFC12345:nombre:'Juan Perez'"
    ```
    
13. **Q3**.  Registrar una nueva venta para un cliente en específico. El uso de LIST permite registrar múltiples productos dentro de una venta, y la estructura RPUSH facilita agregar nuevas ventas de manera secuencial y cronológica.
    ```
    RPUSH sucursal:1111:ventas:2024 "VENTA:20001:PRODUCTO:1003:CANTIDAD:4:COSTO_UNITARIO:60:TOTAL:240:CLIENTE:RFC23456:SUCURSAL:1111:FECHA:20240925:HORA:123500"
    ```
    
14. **Q4**. Buscar sucursales cercanas a una ubicación geográfica específica usando consultas geoespaciales. El uso de GEO es altamente eficiente para realizar búsquedas geoespaciales y permite localizar sucursales cercanas a una ubicación específica.
    ```
    GEORADIUS sucursales_geopos -104.8946 21.5107 10 km WITHDIST
    ```
    
15. **Q5**. Obtener el conjunto de clientes que han comprado en una sucursal específica.
    ```
    SMEMBERS sucursal:1111:clientes
    ```
    
16. **Q6**. Registro histórico de los clientes que han hecho compras en cada sucursal
    
    ```
    SMEMBERS sucursal:1111:clientes
    SMEMBERS sucursal:2222:clientes
    SMEMBERS sucursal:3333:clientes
    SMEMBERS sucursal:4444:clientes

    ```
17. Crear un proyecto en nodejs definiendo una carpeta: `01_redis_api`
    
18. Abrir la carpeta desde VSC y desde el modo consola iniciar el proyecot

    ```
    npm init -y
    ```
    
    ```
    npm init -y
    Wrote to /home/user/Documents/01_NoSQL/2U/01_redis_apis/package.json:

    {
       "name": "01_redis_apis",
       "version": "1.0.0",
       "main": "index.js",
       "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
    },
       "keywords": [],
       "author": "",
       "license": "ISC",
       "description": ""
    }
    ```
    
19. Instalar las dependencias requeridas para el proyecto
    
    ```
    npm install express redis
    ```
    
20. El archivo package.json debe tener las siguientes `dependencies` en dicha seccion

    ```
    {
    "name": "01_requisito_lab",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
       },
       "keywords": [],
       "author": "",
       "license": "ISC",
       "description": "",
       "dependencies": {
    "express": "^4.21.0",
    "redis": "^4.7.0"
    }
    }
    ```

21. Arquitectura clásica (MVC)
    
    `routes/`: Define las rutas de la aplicación, indicando qué controlador manejará cada ruta específica.  
    `controllers/`: Contiene la lógica de la aplicación, es decir, las funciones que se ejecutan cuando se accede a una ruta (endpoint).  
    `models/`: Define la estructura de los datos (modelos), que generalmente interactúa con bases de datos.  
    `app.js`: Archivo principal que configura y arranca la aplicación Express (`index.js` , `server.js`)    
    `.env`: Variables de entorno usadas para la configuración sensible (por ejemplo, claves de API o configuraciones de la base de datos).  
    `package.json`: Lista las dependencias del proyecto y contiene scripts de ejecución, como start o test.  
    
22. Estructura básica del proyecto:
    
   ```
   01_redis_apis/
   ├── routes/
   ├── controllers/
   ├── models/
   ├── app.js                 # Main Express app
   ├── .env                   # Environment variables
   └── package.json
   ```

23.Estructura básica de un archivo `app.js` , `index.js`, `server.js`

   `imports`  , `Routes`  
   `clients, objects`  
   `connect`  
   `middlewares`  
   `routes-controllers`  
   
26. Crear un primer servidor en express `index.js`
    ```
    const express = require('express');
    const redis = require('redis');

    // Crear el cliente Redis
    const client = redis.createClient();

    // Inicializar Express
    const app = express();
    app.use(express.json());

    // Manejo de errores en la conexión de Redis
    client.on('error', (err) => {console.error('Error connecting to Redis', err);
    });

    // Ruta principal
    app.get('/', (req, res) => {
       res.send('API con Node.js, Express y Redis');
    });

    // Iniciar el servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
       console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
    ```
    
27. Estructura del proyecto con archivos adicionales
    
   ```
   01_requisito_lab/
   ├── controllers/
   │   ├── clientController.js
   │   └── productController.js
   ├── routes/
   │   ├── clients.js
   │   └── products.js
   ├── .dockerignore
   ├── Dockerfile
   ├── docker-compose.yml
   ├── package.json
   ├── .env
   └── app.js
   ```

30. Archivo app.js del caso 01 de redis

   ```
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

   ```

28. Controllers
   ```
   // ./controllers/clientController.js
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

   ```


   ```
   //  ./controllers/productController.js
   
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
   exports.getProductDetails = async (req, res) => {
       const { productId, sucursalId } = req.params;
   
       // Armar la clave según el formato: producto:ID:sucursal:ID
       const redisKey = `producto:${productId}:sucursal:${sucursalId}`;
       console.log('Clave:', redisKey);
   
       try {
           // Usar await para obtener los detalles del producto
           const productDetails = await redisClient.hGetAll(redisKey);
   
           if (!productDetails || Object.keys(productDetails).length === 0) {
               return res.status(404).json({ message: 'Producto no encontrado en la sucursal' });
           }
   
           // Retornar los detalles del producto si se encuentra
           return res.status(200).json(productDetails);
       } catch (error) {
           console.error('Error:', error);
           return res.status(500).json({ message: 'Error al procesar la solicitud', error });
       }
   };

   ```
30. Routes
    
   ```
   // ./routes/clients.js
   const express = require('express');
   const router = express.Router();
   const clientController = require('../controllers/clientController');
   
   // Ruta para añadir un nuevo cliente
   router.post('/add', clientController.addNewClient);
   
   module.exports = router;
   ```

   ```
   // ./routes/products.js
   const express = require('express');
   const router = express.Router();
   const productController = require('../controllers/productController');
   
   // Ruta para dos parametros id producto y num. sucursal
   router.get('/:productId/sucursal/:sucursalId', productController.getProductDetails);
   
   module.exports = router;
   ```
32. Dockerfile
    
   ```
   FROM node
   
   WORKDIR /app
   
   COPY package*.json ./
   
   RUN npm install
   
   COPY . .
   
   EXPOSE 3000
   
   CMD ["npm", "start"]
   ```
34. .dockerignore

   ```
   node_modules
   npm-debug.log
   .DS_Store
   .env
   ```
36. docker-compose.yml
   ```
   version: '3'
   services:
     app:
       build: .
       container_name: node_app
       ports:
         - "3000:3000"
       environment:
         - REDIS_URL=redis://redis01:6379
       depends_on:
         - redis
       volumes:
         - .:/usr/src/app
         - /usr/src/app/node_modules
       command: npm start
   
     redis:
       image: redis/redis-stack:latest
       container_name: redis01
       ports:
         - "6379:6379"
         - "8001:8001"
       volumes:
         - /home/user/Documents/redis_data:/data
   ```
38. Ejecutar docker compose
   ```
   docker-compose up --build -d
   ```
40. Verificar conexion desde dentro del contenedor redis
   ```
   docker exec -ti redis01 bash
   root@0178cfa5497b:/# redis-cli ping
   PONG
   ```

   ```
   root@0178cfa5497b:/# redis-cli HGETALL producto:1005:sucursal:4444
   1) "nombre"
   2) "Tuber\xc3\xada galvanizada"
   3) "precio"
   4) "200"
   5) "categoria"
   6) "Fontaner\xc3\xada"
   ```
42. Validar APIs con Postman
43. Subir imagen a dockerhub
    
      
    

