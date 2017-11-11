let itemsController = require('./controllers/items-controller');

const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const http = require('http').Server(app);
const io = require('socket.io')(http);

mongoose.Promise = global.Promise;

app.use('/', express.static(path.join(__dirname, '../web-client')));


mongoose.connect(config.database, {useMongoClient: true});

mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

app.use('/api', router);
itemsController(router, io);

http.listen(8000, function () {
    console.log('Process ' + process.pid + ' is listening to all incoming requests');
});


