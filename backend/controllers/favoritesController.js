const Favorite = require("../models/favoriteModel");

const addFavorite = async(req, res) => {
    try {
        const favorite = await Favorite.create(req.body);
        res.status(201).json(favorite);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getFavorites = async(req, res) => {
    try {
        const favorites = await Favorite.find();
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addFavorite, getFavorites };