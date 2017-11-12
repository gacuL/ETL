const io = require('socket.io-client');
let socket = io();
let res = {};
if(res === false){
    console.log('pending...');
}

console.log('check 1 status is pending', socket.connected);
socket.on('connect', function() {
    socket.on('result', function(result){
        res = result;
        console.log('check 2 is resolved', result);
    });
//        console.log('check 2 is resolved', socket.connected);
});

console.log(res);



