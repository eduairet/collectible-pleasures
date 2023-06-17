'use strict';

const express = require('express'),
    morgan = require('morgan'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    app = express(),
    PORT = 8080,
    sketch = require('./routes/sketch-route');

app.use(morgan('tiny'));
app.use(cors('*'));
app.use(bodyParser.json())
app.use('/', sketch);
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
