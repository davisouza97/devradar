const axios = require('axios');
const Dev = require('../models/Dev')
const { findConnections ,sendMessage } = require('../websocket')


const ParseStringAsArray = require('../utils/ParseStringAsArray');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);

    },
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {


            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            //continuar 
            const { name = login, avatar_url, bio } = apiResponse.data;
            //{ } desetruturação (name = login == se não existir name entra login no lugar)
            const techsArray = ParseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,//short syntax nomes iguais
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            //filtrar conexoes que estao dentro do raio de distancia e tecs

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            );

            sendMessage(sendSocketMessageTo, 'new-dev' , dev);
            
        }
        return response.json(dev);
    }
}