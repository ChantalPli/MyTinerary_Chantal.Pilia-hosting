const mongoose = require('mongoose');
// const itineraries = mongoose.model('itineraries');

const activitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    itinerary: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' }
});

const Activity = mongoose.model('Activity', activitySchema, 'Activity');

module.exports = Activity;

