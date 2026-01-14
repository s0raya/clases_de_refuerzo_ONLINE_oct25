const express = require('express');
const app = express();
const routes = require('./routes/data.js');
const cors = require('cors');

const PORT = 3000;

app.use(cors({
    origin: 'http://127.0.0.1:5501', // Origen permitido(frontend), si pusiesemos * permitiría cualquier origen
    allowedHeaders: ['Content-Type', 'x-user', 'x-pass'], 
    /* 
        Estas son cabeceras personalizadas. El navegador lanza una petición OPTIONS (preflight) 
        para preguntar si puede enviarlas. si no están aquí el navegador bloquea la peticion
    */
    methods: ['GET', 'POST', 'PUT', 'DELETE'] /* Métodos permitidos */
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Express está escuchando en http://localhost:${PORT}`);
});
