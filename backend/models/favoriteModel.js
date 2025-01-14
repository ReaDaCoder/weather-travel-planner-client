const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    city: { type: String, required: true },
    weather: { type: Object, required: true },
    activities: { type: [String], default: [] },
});

module.exports = mongoose.model("Favorite", favoriteSchema);