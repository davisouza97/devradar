const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://davi:senhadavi@cluster0-gd5jc.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//para que o express entenda o body json
app.use(express.json());
app.use(routes);
//METODOS HTTP

//TIPOS DE PARAMETROS
//Query params: request.query (filtros, ordenação, paginação)
//Route params: request.params (identificar recursos alteração/ deleção)put/delete /users/1
//Body: request.body


//mongoDB (NÂO RELACIONAL)


app.listen(3333);