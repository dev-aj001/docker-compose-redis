
# 01 Redis API with node y express

Entregable final de la unidad 1 de la materia NOSQL.




## Introducción

Para ejecutar la app es neserario cumplir con los siguientes requisitos.

- Hacer pull a la imagen jair23/01_redis_api_app
    ```bash
    docker pull jair23/01_redis_api_app
    ```
- Descargar el laboratorio de la base de datos de Redis: [redis.txt](https://github.com/dev-aj001/docker-compose-redis/blob/main/laboratorio_redis.txt)
- Cambiar en el archivo docker-compose.yml por la imagen descargada.
- Levantar el docker-compose.yml.
    ```bash
    docker-compose -d up
    ```
- En redis actualizar la base de datos con los datos del laboratorio.


## Rutas

### Q1. Obtener los detalles de un producto dado su ID.

ruta: `http://localhost:3000/clients/add`

metodo: `post`

body:

```js
{
    "rfc":"RFC1234Y",
    "nombre":"'Cesar Uriel 2'",
    "sucursalId":"1111"
}
 ```

### Q2. Registrar una nueva venta para un cliente en específico.

ruta: `http://localhost:3000/ventas/2024/sucursal/1111`

metodo: `post`

body:

```js
{
    "ventaId":"10123",
    "productoId":"1003",
    "cantidad":"2",
    "costo_unitario":"60",
    "rfc":"RFC12345",
    "fecha":"20240922",
    "hora":"123456"
}
 ```

### Q3. Buscar sucursales cercanas a una ubicación geográfica específica usando consultas geoespaciales.

ruta: `http://localhost:3000/sucursal/geoRadius/`

metodo: `get`

body:

```js
{
    "key":"sucursales_geopos",
    "latitude":"21.5107",
    "longitude":"-104.8946",
    "km":"5"
}
 ```

### Q5. Obtener el conjunto de clientes que han comprado en una sucursal específica.

ruta: `http://localhost:3000/sucursal/1111/clientes`

metodo: `get`

body:

```js
    none
 ```

### Q6. Registro histórico de los clientes que han hecho compras en cada sucursal.

ruta: `http://localhost:3000/sucursal/clientes`

metodo: `get`

body:

```js
    none
 ```
## Authors

- [@dev-aj001](https://github.com/dev-aj001/docker-compose-redis/)

