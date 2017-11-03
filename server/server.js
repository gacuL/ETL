let cluster = require('cluster');
let itemsController = require('./controllers/items-controller');

if(cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    const express = require('express');
    const path = require('path');
    const app = express();
    const router = express.Router();
    const mongoose = require('mongoose');
    const config = require('./config/database');
    const publicPath = path.join(__dirname, '../web-client');

    mongoose.connect(config.database, {useMongoClient: true});

    mongoose.connection.on('connected', () => {
        console.log('Connected to database '+ config.database);
    });


    app.use('/api', router);
    console.log('not master', cluster.worker.id);
    itemsController(router);

    //const mongoose = require('mongoose');
    // let opinionSchema = new mongoose.Schema({
    //     content: String
    // });
    //
    // let Post = mongoose.model("Post", opinionSchema);
    // let newPost = new Post({
    //     content: "Piekny komentarz"
    // });
    // newPost.save((err,post)=>{
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log(post);
    //     }
    // })
    //
    //
    //
    // let itemSchema = new mongoose.Schema({
    //     id: Number,
    //     name: String,
    //     opinion: [opinionSchema]
    // });
    //
    //
    //
    // console.log('test');
    // let Item = mongoose.model("Item", itemSchema);
    //
    // let newItem = new Item({
    //     id: 1124124,
    //     name: "Pitro",
    // });
    //
    // for(let i = 0; i < 5; i+=1){
    //     newItem.opinion.push(newPost)
    // }
    //
    //
    //
    // newItem.save((err, item)=>{
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log(item);
    //     }
    // });


    app.listen(8000, function() {
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });
}
// const express = require('express');
// const app = express();
// // let http = require('http');
//
//  // let server = http.createServer((req, res)=> {
//  //     res.write('Test message');
//  //     res.end();
//  // })
// //
// // let options = {
// //     host: "proxy",
// //     port: 3000,
// //     path: "http://www.ceneo.pl",
// //     headers: {
// //         Host: "http://www.ceneo.pl"
// //     }
// // };
// // http.get(options, function(res) {
// //     console.log(res);
// //     res.pipe(process.stdout);
// // });
//
// const path = require('path');
// const publicPath = path.join(__dirname, '../web-client');
//
// const cluster = require('cluster');
// let numCPUs = 4;
//
// let phonesController = require('./controllers/phones-controller');
//
//
//
//
//
// app.use(express.static(publicPath));
//
// let a  =5;
//
// if(cluster.isMaster){
//     console.log('on master');
//     for(let i = 0; i < numCPUs; i++){
//         cluster.fork();
//     }
//
//     process.exit();
// } else {
//     const router = express.Router();
//     app.use('/api', router);
//
//     console.log('not master', cluster.worker.id);
//     phonesController(router, cluster.worker.id);
//     app.listen(3000, function () {
//         console.log('Example app listening on port 3000!')
//     });
//
//     process.exit();
//
// }
//
//
//
//
