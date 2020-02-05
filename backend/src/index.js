const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const {setupWebSocket} = require('./websocket')


const app = express();
const server = http.Server(app);

setupWebSocket(server);


mongoose.connect('mongodb+srv://davi:senhadavi@cluster0-gd5jc.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use(cors());   //geral
//app.use(cors());   //geral
//app.use(cors({ origin: 'http://localhost:3000'}));   //localhost

app.use(express.json());
app.use(routes);

server.listen(3333);