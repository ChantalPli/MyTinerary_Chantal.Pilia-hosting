const Itinerary = require('../models/Itinerary');
const Activity = require('../models/Activity');

const itineraryController = {
    fetchItineraries: async (request, response) => {
        let result, error = null;
        try {
            // e.g: request.query = { city: "6219ac8a754e451ed1d630a1" }
            result = await Itinerary.find(request.query).populate("comments.user", { firstName: 1, lastName: 1, picture: 1 });
        } catch (error) {
            console.log(error);
        }
        response.json({
            success: error ? false : true,
            content: error ? error : { itineraries: result },
        });
    },
    fetchItinerary: async (request, response) => {
        let result, error = null;
        try {
            result = await Itinerary.find({ _id: request.params.id }).populate("comments.user", { firstName: 1, lastName: 1, picture: 1 });
        } catch (error) {
            console.log(error);
        }
        response.json({
            success: error ? false : true,
            content: error ? error : { itinerary: result.length == 1 ? result[0] : null },
        });
    },
    insertItinerary: async (request, response) => {
        new Itinerary(request.body).save().then((data) => response.json(data));
    },
    deleteItinerary: async (request, response) => {
        response.json(await Itinerary.findOneAndDelete({ _id: request.params.id }));
    },
    modifyItinerary: async (request, response) => {
        response.json(await Itinerary.findOneAndUpdate({ _id: request.params.id }, request.body));
    },

    /////////PARTE DE LOS CONTROLADORES DE LIKE Y DISLIKE///////
    likeDislike: async (req, res) => {
        const id = req.params.id //LLEGA POR PARAMETRO a traves de AXIOS// id dell'itinerario dove vogliamo aggiungere o togliere il like 
        const user = req.user.id //LLEGA POR RESPUESTA DE PASSPORT// dato del id del usuario 

        await Itinerary.findOne({ _id: id }) ///id de itinerario

            .then((itinerary) => {
                if (itinerary.likes.includes(user)) { // de ese itinerario que encontramos vamos a buscar la propiedad likes y si esta incluye el usuario
                    Itinerary.findOneAndUpdate({ _id: id }, { $pull: { likes: user } }, { new: true })//
                        .then((response) => res.json({ success: true, response: response.likes }))
                        .catch((error) => console.log(error))
                } else {
                    Itinerary.findOneAndUpdate({ _id: id }, { $push: { likes: user } }, { new: true })//
                        .then((response) => res.json({ success: true, response: response.likes }))
                        .catch((error) => console.log(error))
                }
            })
            .catch((error) => res.json({ success: false, response: error }))
    },





};

module.exports = itineraryController;