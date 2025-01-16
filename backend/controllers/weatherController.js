const axios = require("axios");

const getWeather = async(req, res) => {
    const { city } = req.params;

    try {
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
        );

        const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
        );



        res.status(200).json({
            current: weatherResponse.data,
            forecast: forecastResponse.data,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
};

module.exports = { getWeather };