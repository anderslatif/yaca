const express = require('express');
const app = express();

const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const uuidv4 = require('uuid/v4');

app.use(express.static('public'));

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/snowmobiles', (req, res) => {
    res.sendFile(__dirname + '/public/snowmobiles/index.html');
});

app.get('/ratwars', (req, res) => {
    res.sendFile(__dirname + '/public/ratwars/index.html');
});

let sockets = [];

io.on('connect', socket => {
    const socketObject = {
        id: socket.id,
        message: '',
        likeScore: 2.5,
    };
    sockets.push(socketObject);

    socket.on('client_message', data => {
        const foundSocket = sockets.find(sock => sock.id === socket.id);
        const valence = sentiment.analyze(data.message);

        // todo handle nonsense statements
        // todo put variables globally and server side check the length

        const deltaSpeed = /*valence.score === 0 ? 0.5 : */-(2 * valence.score / 100) + 0.16;
        const response = {
            socketId: foundSocket.id,
            uniqueId: uuidv4(),
            message: data.message,
            fontSize: foundSocket.likeScore,
            deltaSpeed,
            x: 100,
            y: Math.floor(Math.random() * 92) + 1, // random number between 1 and 100
        };

        io.emit("server_message", response);
    });

    socket.on('message_liked', data => {
        sockets.forEach(sock => {
            if (sock.id === data.socketId) {
                if (data.likeScore === 1 && sock.likeScore > 0.2 && sock.likeScore < 3.9) {
                    sock.likeScore += data.likeScore / 10;
                } else if (data.likeScore === -1 && sock.likeScore < 4) {
                    sock.likeScore += data.likeScore / 10;
                }
            }
        })
    });

    socket.on("disconnect", () => {
        sockets.filter(sock => sock.id !== socket.id);
    });
});

const port = process.env.NODE_ENV === 'production' ? 80 : 3000;

const served = server.listen(port, (error) => {
    if (error) throw error;
    console.log("Server is running on port ", served.address().port);
});
