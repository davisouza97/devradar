const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/PareseStringAsArray');

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;

        //filtro de distancia = raio de 10km

        //filtro de techs
        const techsArray = ParseStringAsArray(techs);

        console.log(techsArray);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000,
                },
            },
            
        });

        return response.json({ devs });
    }
}