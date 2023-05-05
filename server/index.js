'use strict';

const express = require('express'),
    app = express(),
    PORT = 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {}); 

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
