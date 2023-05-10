'use strict';

const express = require('express'),
    morgan = require('morgan'),
    cors = require('cors'),
    app = express(),
    PORT = 8080,
    sketch = require('./routes/sketch-route');

require('dotenv').config();
const cosrsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
};

app.use(morgan('tiny'), express.static('./public'));
app.use(cors(cosrsOptions));
app.use('/', sketch);
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
