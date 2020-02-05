import socketio from "socket.io-client";
import { environment } from "../utils/environment";

const socket = socketio(environment.baseUrl, {
    autoConnect: false,
});


function subscribeToNewDevs(subscribeFunction){
    socket.on('new-dev', subscribeFunction); 
}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    }
    socket.connect();
}

function disconnect() {
    if (socket.connected) {
        socket.disconnect();
    }
}


export {
    connect,
    disconnect,
    subscribeToNewDevs,
};