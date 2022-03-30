const Activity = require('../models/Activity');
const Itinerary = require('../models/Itinerary');



const activityController = {
    fetchActivities: async (request, response) => {
        let result, error = null;
        try {
            result = await Activity.find(request.query);// para filtrar las actividades
        } catch (error) {
            console.log(error);
        }
        response.json({
            success: error ? false : true,
            content: error ? error : { activities: result },
        });
    },
    fetchActivity: async (request, response) => {
        let result, error = null;
        try {
            result = await Activity.find({ _id: request.params.id });
        } catch (error) {
            console.log(error);
        }
        response.json({
            success: error ? false : true,
            content: error ? error : { activity: result.length == 1 ? result[0] : null },
        });
    },
    insertActivity: async (request, response) => {
        new Activity(request.body).save().then((data) => response.json(data));
    },
    deleteActivity: async (request, response) => {
        response.json(await Activity.findOneAndDelete({ _id: request.params.id }));
    },
    modifyActivity: async (request, response) => {
        response.json(await Activity.findOneAndUpdate({ _id: request.params.id }, request.body));
    }
};

module.exports = activityController;