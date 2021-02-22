require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();


// Rutas
app.use( '/api/catalogo/anios', require('./routes/catalogo/anio') );
app.use( '/api/catalogo/paises', require('./routes/catalogo/pais') );
app.use( '/api/catalogo/temas', require('./routes/catalogo/temas'));
app.use( '/api/usuarios', require('./routes/usuarios/users'));
//app.use( '/api/catalogo/temas', require('./routes/catalogo/temas') );
app.use( '/api/login', require('./routes/auth/auth') );

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});

