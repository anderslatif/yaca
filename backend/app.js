const express = require('express');
const app = express();

app.use(express.static('public'));

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(`${__dirname }/public`));

const serveRoute = require('./routes/serve_route');

app.use(serveRoute);

const whatsOnYourMindSocket = require('./sockets/whatsOnYourMindSocket.js');
whatsOnYourMindSocket(io);

const port = process.env.NODE_ENV === 'production' ? 80 : 8080;

const served = server.listen(port, (error) => {
    if (error) throw error;
    console.log("Server is running on port ", served.address().port);
});
