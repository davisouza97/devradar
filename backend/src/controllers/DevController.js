const axios = require('axios');
const Dev = require('../models/Dev')
const ParseStringAsArray = require('../utils/PareseStringAsArray');

module.exports = {
    async index(request,response){
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

            //console.log(name, avatar_url, bio, github_username);

            const techsArray = ParseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,//short syntax nomes iguais
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
        return response.json(dev);
    }
}