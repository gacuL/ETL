const express = require('express');
const app = express();

const path = require('path');
const publicPath = path.join(__dirname, '../web-client');

app.use(express.static(publicPath));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});