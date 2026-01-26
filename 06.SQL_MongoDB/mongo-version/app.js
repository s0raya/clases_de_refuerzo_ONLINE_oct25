const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
require('dotenv').config();

const PORT = 3001;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
