'use strict';

const express = require('express'),
    morgan = require('morgan'),
    cors = require('cors'),
    app = express(),
    PORT = 8080,
    sketch = require('./routes/sketch-route');

require('dotenv').config();
const corsOptions = {
    origin: `*`,
};

app.use(morgan('tiny'));
app.use(cors('*'));
app.use('/', sketch);
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
