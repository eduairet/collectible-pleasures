'use strict';

const express = require('express'),
    morgan = require('morgan'),
    cors = require('cors'),
    app = express(),
    PORT = 8080,
    sketch = require('./routes/sketch-route');

require('dotenv').config();
const { CORS_ORIGIN, SERVER_ORIGIN } = process.env,
    corsOptions = {
        origin: [CORS_ORIGIN, SERVER_ORIGIN],
    };

app.use(morgan('tiny'), express.static('./public'));
app.use(cors(corsOptions));
app.use('/', sketch);
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
