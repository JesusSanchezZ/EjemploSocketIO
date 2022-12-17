const express = require('express');
//const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server,{
    cors: {
        origin: "http://localhost:4200"
    }
});

io.on('connection', (socket) => {
    // Este id se genera al conectarte al socket
    const idHandShake = socket.id;

    const { nameRoom } = socket.handshake.query;

    socket.join(nameRoom);

    console.log(`Hola dispositivo: ${idHandShake} se unio --> ${nameRoom}`);

    socket.on('event',(res) =>{
        //console.log(res);

        // envía datos a los miembros del grupo, excepto al emisor
        socket.to(nameRoom).emit('event', res);
    })
});

server.listen(5000, () => {
    console.log('>> Socket listo y escuchando por el puerto: 5000');
});