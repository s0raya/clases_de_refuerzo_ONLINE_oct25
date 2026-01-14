const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.js');

// Array de datos de ejemplo
let datos = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 25, ciudad: 'Madrid' },
    { id: 2, nombre: 'María', apellido: 'García', edad: 30, ciudad: 'Barcelona' },
    { id: 3, nombre: 'Carlos', apellido: 'López', edad: 28, ciudad: 'Valencia' },
    { id: 4, nombre: 'Ana', apellido: 'Martínez', edad: 35, ciudad: 'Sevilla' },
    { id: 5, nombre: 'Luis', apellido: 'Sánchez', edad: 22, ciudad: 'Bilbao' }
];

// --------------------
// LOGIN
// --------------------
router.post('/login', (req, res) => {
    const { user, pass } = req.body;

    if (user === 'admin' && pass === '1234') {
        res.json({ success: true,});
    } else {
        res.status(401).json({
            error: 'Usuario o contraseña incorrectos'
        });
    }
});

// --------------------
// CRUD (usa HEADERS)
// --------------------

// GET all - obtener todos los datos
router.get('/datos', authMiddleware, (req, res) => {
    res.json(datos);
});

// POST - crear nuevo dato
router.post('/datos', authMiddleware, (req, res) => {
    const { nombre, apellido, edad, ciudad } = req.body;

    /* Hacemos los datos obligatorios */
    if (!nombre || !apellido || !edad || !ciudad) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const nuevoId = datos.length > 0 ? Math.max(...datos.map(d => d.id)) + 1 : 1;

    const nuevoDato = {
        id: nuevoId,
        ...req.body
    };

    datos.push(nuevoDato);
    res.status(201).json(nuevoDato);
});

// PUT - actualizar un dato
router.put('/datos/:id', authMiddleware, (req, res) => {
    const id = parseInt(req.params.id);
    const index = datos.findIndex(d => d.id === id);

    if (index !== -1) {
        datos[index] = { id, ...req.body };
        res.json(datos[index]);
    } else {
        res.status(404).json({ error: 'No existe' });
    }
});

// DELETE - eliminar un dato
router.delete('/datos/:id', authMiddleware, (req, res) => {
    const id = parseInt(req.params.id);
    const index = datos.findIndex(d => d.id === id);

    if (index !== -1) {
        datos.splice(index, 1);
        res.json({ message: 'Eliminado correctamente' });
    } else {
        res.status(404).json({ error: 'No existe' });
    }
});

// --------------------
// BÚSQUEDA
// --------------------
router.post('/buscar', authMiddleware, (req, res) => {
    const { searchedValue } = req.body;

    if (!searchedValue) {
        return res.status(400).json({ error: 'Valor de búsqueda requerido' });
    }

    const resultado = datos.find(d =>
        d.nombre.toLowerCase().includes(searchedValue.toLowerCase())
    );

    if (resultado) {
        res.json({ existe: true, mensaje: 'ok', dato: resultado });
    } else {
        res.json({ existe: false, mensaje: 'No existe' });
    }
});

module.exports = router;
