const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const weatherRoutes = require("./routes/weatherRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/weather", weatherRoutes);
app.use("/api/favorites", favoritesRoutes);

module.exports = app;