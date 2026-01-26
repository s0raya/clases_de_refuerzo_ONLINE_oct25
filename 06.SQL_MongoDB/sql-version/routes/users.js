const express = require('express');
const router = express.Router();
const db = require('../db/db');
const { fetchUsers } = require('../services/service');

// Importar usuarios desde API y guardarlos
router.post('/import', async (req,res) => {
    try {
        const users = await fetchUsers();

        for (const user of users) {
            db.query(
                `INSERT INTO usuarios (external_id, nombre, email, ciudad) VALUES (?, ?, ?, ?)`, 
                [user.id, user.name, user.email, user.address.city], 
                (err) => {
                    if (err) {
                        console.error('Error al insertar usuario:', err);
                    }
                }
            );
        };

        res.json({ message: 'Usuarios importados desde API'})
    } catch (error) {
        res.status(500).json({ error: 'Error al importar usuarios' });
    }
});

// Obtener todos los usuarios
router.get('/', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.json({ total: results.length, usuarios: results });
    });
});

module.exports = router;