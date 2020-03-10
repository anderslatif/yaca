const roomData = require('../util/room_data');
const crypto = require("crypto");


function joinRoom(socket) {
    const namespace = socket.nsp.name;
    const roomInfo = roomData[namespace];

    roomInfo.rooms.forEach(room => {
        if (room.size < roomInfo.limit) {
            socket.join(room.name);
            saveRoomInSocket(socket, room.name);
            room.size += 1;
            return;
        }
    });
    // if we get here it means that we never returned and we need to create a new room

    const newRoomName = crypto.randomBytes(20).toString('hex');
    socket.join(newRoomName);
    saveRoomInSocket(socket, newRoomName);
    roomInfo.rooms.push({'name': newRoomName, 'size': 1});
    console.log(socket._rooms);
}

function saveRoomInSocket(socket, roomName) {
    // update socket's rooms
    if (socket._rooms) {
        socket._rooms.push(roomName);
    } else {
        socket._rooms = [roomName];
    }
}

function leaveRoom(socket) {
    const namespace = socket.nsp.name;
    const roomInfo = roomData[namespace];

    roomInfo.rooms.forEach(room => {

    });

    socket.leave('room');
}

module.exports = { joinRoom, leaveRoom };
