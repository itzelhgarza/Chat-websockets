// const http = require('http');
const path = require('path');
const express = require('express');
app = express();

//Configuración del puerto
app.set('port', process.env.PORT || 3000);

//archivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); //Nuestra app express -> va a utilizar -> un archivo estático -> llamado 'public'

//Iniciamos el server
const server = app.listen(app.get('port'), () => { //Servidor escuchando
    console.log('Servidor en el puerto ', app.get('port'));
});

//Configuración del socketio
const socketio = require('socket.io');
const io = socketio(server);

//websockets
io.on('connection', (socket) => {
    console.log('Nueva conexión', socket.id);

    socket.on('chat:message', (data) =>{
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) =>{
        socket.broadcast.emit('chat:typing', data);
    })
});




// const server = http.createServer(app); //Se crea un servidor
// const io = socketio(server); //"Socketio, quiero que escuches en el servidor que cree previamente"

// io.on('connection', socket =>{
//     console.log('Nuevo usuario conectado');
// });

// s 




