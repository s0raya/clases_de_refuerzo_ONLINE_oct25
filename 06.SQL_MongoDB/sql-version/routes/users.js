const express = require('express');
const router = express.Router();
const db = require('../db/db');
const { fetchUsers } = require('../services/service');

// Importar usuarios desde API y guardarlos
router.post('/import', async (req,res) => {
    try {
        const usersFetch = await fetchUsers();

        for (const user of usersFetch) {
            /* SE HACE ESTA CONSULTA PORQUE SI ELIMINAMOS UN USUARIO Y LUEGO HACEMOS DE NUEVO FETCH A LA API PARA INSERTARLOS EN LA TABLA DE NUEVO
            NOS VA A DAR ERROR EXTERNAL_ID PORQUE ES UNIQUE Y NO PUEDE ESTAR DUPLICADA, POR LO TANTO CON ESTA CONSULTA ACTUALIZAMOS SOLO LOS DATOS 
            DE NAME, EMAIL Y CITY*/
            db.query(
                `
                    INSERT INTO users (external_id, name, email, city) 
                    VALUES (?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                    name = VALUES(name),
                    email = VALUES(email),
                    city = VALUES(city)
                `, 
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
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.json({ total: results.length, usuarios: results });
    });
});

router.put("/:id", (req, res) => {
  const { name, email, city } = req.body
  const { id } = req.params

  const query =
    "UPDATE users SET name = ?, email = ?, city = ? WHERE id = ?"

  db.query(query, [name, email, city, id], (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    if (result.affectedRows === 0) {
      // para ver si ha encontrado o no al usuario
      return res.status(404).send("Usuario no encontrado")
    }

    res.json({ message: "Usuario actualizado con éxito", id })
  })
})

router.delete("/:id", (req, res) => {
  const { id } = req.params
  const query = "DELETE FROM users WHERE id = ?"

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    if (result.affectedRows === 0) {
      // para ver si ha encontrado o no al usuario
      return res.status(404).send("Usuario no encontrado")
    }
    res.json({ message: "Usuario borrado con éxito" })
  })
})

module.exports = router;