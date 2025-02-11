const socketio = require('socket.io');
const parseStringAsArray = require('./utils/ParseStringAsArray');
//const calculateDistance = require('./utils/calculateDistance');

const connections = [];

let io;

exports.setupWebSocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordenadas: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });
    });
};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return getDistanceFromLatLonInKm(coordinates, connection.coordenadas) < 10
            && connection.techs.some(item => techs.includes(item))
    });
}

exports.sendMessage = (to, message, data) =>{
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    });
}

//importação do arquivo não deu certo então os metodos do utils/calculateDistance estão aqui
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInKm(centerCoordinates, pointCoordinates) {
    const radius = 6371;

    const { latitude: lat1, longitude: lon1 } = centerCoordinates;
    const { latitude: lat2, longitude: lon2 } = pointCoordinates;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * center;

    return distance;
};