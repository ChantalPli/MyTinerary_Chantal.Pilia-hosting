const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    //likes: { type: Number, required: true },
    hashtags: { type: Array, required: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
    // activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    //aggiunta per attività
    autor: { type: mongoose.Types.ObjectId, ref: "User" },
    comments: [{
        comment: { type: String },
        user: { type: mongoose.Types.ObjectId, ref: "User" },
    }],
    likes: { type: Array, required: true }, //se puede poner set?para no repetir los elementos,para que el user solo pueda hacer like una vez; 
    /////
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema, 'Itinerary');

module.exports = Itinerary; 