const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { fetchUsers } = require('../services/service');

// Importar usuarios desde API y guardarlos
router.post('/import', async (req, res) => {
    try {
        const users = await fetchUsers();

        for (const user of users) {
            await User.updateOne(
                { externalId: user.id },
                {
                    externalId: user.id,
                    name: user.name,
                    email: user.email,
                    city: user.address.city
                },
                { upsert: true }
            );
        }
        res.json({ message: 'Usuarios importados desde API' });
    } catch (error) {
        res.status(500).json({ error: 'Error al importar usuarios', error });
    }
})

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    const users = await User.find();
    res.json({ total: users.length, users });
});

module.exports = router;