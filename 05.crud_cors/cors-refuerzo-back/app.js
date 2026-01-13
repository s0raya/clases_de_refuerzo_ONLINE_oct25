const express = require('express');
const app = express();
const routes = require('./routes/data.js');
const cors = require('cors');

const PORT = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Express está escuchando en http://localhost:${PORT}`);
});
