const User = require('../models/User');
const { fetchUsers } = require('../services/fetchUsers')

const usersController = {
    async importUsers(req,res) {
        try {
            const usersFetch = await fetchUsers();

            for(const user of usersFetch) {
                await User.updateOne(
                    { externalId: user.id },
                    {
                        external: user.id,
                        name: user.name,
                        email: user.email,
                        city: user.address.city
                    },
                    { upsert: true}
                );
            }
            res.status(201).json({ message: 'Usuarios importados desde API'})
        } catch {
            res.status(500).json({ error: 'Error al importar usuarios', error})
        }
    },

    async getUsers (req,res) {
        const users = await User.find();
        res.json({ total: users.length, users})
    },

    async editUser (req,res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true, // te devuelve el usuario ya actualizado
                runValidators: true, //verifica que los campos modificados cumplen con las reglas.
            });

            if(!updatedUser) {
                return res.status(404).send("Usuario no encontrado")
            }

            res.status(200).json(updatedUser)

        } catch (err) {
            res.status(400).send(err.message)
        }
    },

    async deleteUser(req,res) {
        try{ 
            const deletedUser = await User.findByIdAndDelete(req.params.id)

            if(!deletedUser) {
                return res.status(404).send("Usuarios no encontrado")
            }

            res.status(200).json({ message: "Usuario eliminado correctamente"})
        } catch (err) {
            res.status(500).send(err.message)
        }
    }
}

module.exports = usersController;