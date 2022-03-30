const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    // itineraries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' }]
})

const City = mongoose.model('City', citySchema, 'City');

module.exports = City;
