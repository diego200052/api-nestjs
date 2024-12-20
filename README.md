<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Proyecto Backend en NestJS

Este proyecto es una API desarrollada con **Node.js**, **MongoDB** y **TypeScript**, diseñada para gestionar usuarios, camiones, órdenes y ubicaciones. Incluye autenticación mediante JWT y un enfoque en código limpio, buenas prácticas y uso eficiente de las herramientas disponibles.

## Objetivos principales:
  - Desarrollar la lógica de una API con interfaces, modelos, rutas y controladores.
  - Implementar autenticación JWT y validar tokens en cada endpoint.
  - Crear CRUDs para cada dominio (`Users`, `Trucks`, `Orders`, `Locations`).
  - Validar datos antes de su inserción en la base de datos.
  - Usar variables de entorno almacenadas en un archivo `.env`.
  - Consumir un API externa llamada Places API de Google para obtener la dirección y coordenadas de un determinado lugar.

## Dominios Implementados

**Nota**: El acceso a todos los endpoints requieren del JWT, excepto el registro y el login de usuarios. El JWT debe estar incluido en los headers con Key `Authorization` y Value `Bearer eyJhbGciOiJIUzI1Ni...`

### **Users**
- Funcionalidad:
  - Registro de usuarios asegurando que no se dupliquen registros.
  - Login de usuarios con generación de un token JWT.
  - Administración de usuarios (Crear, eliminar, actualizar, listar).
- Endpoints `/auth`:
  - Registro de usuario `POST /auth/register`
  - Inicio de sesión de usuarios `POST /auth/login`
- Endpoints `/users`:
  - Listar todos los usuarios `GET /users`
  - Obtener un usuario por ID `GET /users/:id`
  - Obtener un usuario por email `GET /users/email/:email`
  - Crear un usuario `POST /users`
    - ```json
      {
        "email": "string", //(required)
        "password": "string" //(required)
      }
  - Borrar un usuario por ID `DELETE /users/:id`
  - Actualizar un usuario por ID `PATCH /users/:id`
- Esquema:
  ```json
  {
    "email": "string",
    "password": "string"
  }
---
### **Trucks**
- Funcionalidad:
  - Administración de camiones asociados a un usuario.
- Endpoints `/trucks`:
  - Listar todos los camiones `GET /trucks`
  - Obtener un camión por ID `GET /trucks/:id`
  - Obtener todos los camiones de un usuario `GET /trucks/users/:userId`
  - Registrar un camión `POST /trucks`
    - ```json
      {
        "user": "ObjectId", //(required)
        "year": "string", //(required)
        "color": "string", //(required)
        "plates": "string" //(required)
      }
  - Borrar un camión por ID `DELETE /trucks/:id`
  - Actualizar un camión por ID `PATCH /trucks/:id`
- Esquema:
  ```json
  {
    "user": "ObjectId",
    "year": "string",
    "color": "string",
    "plates": "string"
  }
---
### **Orders**
- Funcionalidad:
  - Crear órdenes vinculadas a un usuario, un camión, un origen (pickup) y un destino (dropoff).
  - Actualizar el estatus de una orden (`created`, `in_transit`, `completed`).
- Endpoints `/orders`:
  - Listar todas las ordenes `GET /orders`
  - Obtener una orden por ID `GET /orders/:id`
  - Obtener todas las ordenes de un usuario `GET /orders/user/:userId`
  - Crear una nueva orden `POST /orders`
    - ```json
      {
        "user": "ObjectId", //(required)
        "truck": "ObjectId", //(optional)
        "status": "string (created | in_transit | completed)", //(required)
        "pickup": "ObjectId", //(optional)
        "dropoff": "ObjectId" //(optional)
      }
  - Eliminar una orden por ID `DELETE /orders/:id`
  - Actualizar una orden por ID `PATCH /orders/:id`
  - Actualizar el STATUS de una orden por ID `PATCH /orders/status/:id`
    - ```json
      {
        "status": "string (created | in_transit | completed)" //(required)
      }
- Esquema:
  ```json
  {
    "user": "ObjectId",
    "truck": "ObjectId",
    "status": "string (created | in_transit | completed)",
    "pickup": "ObjectId",
    "dropoff": "ObjectId"
  }
---
### **Locations**
- Funcionalidad:
  - Crear ubicaciones usando un `place_id` de Google Maps.
  - Evitar duplicados al crear ubicaciones.
  - Obtener coordenadas y dirección usando la API de Google Maps.
  - Listar, modificar y eliminar ubicaciones.
- Endpoints `/locations`:
  - Listas las ubicaciones `GET /locations`
  - Obtener una ubicación por ID `GET /locations/:id`
  - Obtener una ubicación por place_id `GET /locations/place/placeId`
  - Registrar una nueva ubicación por place_id `POST /locations`
    - ```json
      {
        "place_id": "string", //required
      }
  - Borrar una ubicación por ID `DELETE /locations/:id`
  - Actualizar una ubicación por ID `PATCH /locations/:id`
- Esquema:
  ```json
  {
    "address": "string",
    "place_id": "string",
    "latitude": "number",
    "longitude": "number"
  }
---
## Configuración del proyecto

### Requisitos
  - Node.js 16+
  - MongoDB
  - Archivo `.env` configurado con las variables necesarias.
```ini
DB_URI=mongodb://127.0.0.1:27017/trucks_system
JWT_SECRET=
JWT_EXPIRES_IN=4h
BCRYPT_SALTIT=10
APIKEY_PLACES_GOOGLE=
HTTP_TIMEOUT=10000
HTTP_MAX_REDIRECTS=5
```

## Instalación

```bash
$ npm install
```

## Compilación y ejecución del proyecto

```bash
# Desarrollo
$ npm run start:dev

# Producción
$ npm run start:prod
```

## Despliegue a producción

Para desplegar la aplicación a producción, consulte la [Documentación](https://docs.nestjs.com/deployment) para obtener más información.

## Licencias

  - Nest posee una licencia [MIT](https://github.com/nestjs/nest/blob/master/LICENSE).