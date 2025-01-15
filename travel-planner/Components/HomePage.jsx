import React, { useEffect, useState } from 'react';
import "../src/App.css";
import axios from 'axios';

export default function HomePage() {
    const [weatherData, setWeatherData] = useState({ ready: false });
    const [temperature, setTemperature] = useState(null);
    const [city, setCity] = useState(""); // State to track the city name
    const apiKey = "5d7b9ccc3e46361f64b317d8161bb16e";

    useEffect(() => {
        let form = document.querySelector("#search-form");
        if (form) {
            form.addEventListener("submit", searchButton);
        }
    
        return () => {
            if (form) {
                form.removeEventListener("submit", searchButton);
            }
        };
    }, []);

    function getResponse(response) {
        console.log(response.data);
        setWeatherData({
            ready: true,
            coordinates: response.data.coord,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            wind: response.data.wind.speed,
            city: response.data.name,
        });

        setTemperature(response.data.main.temp);
        setCity(response.data.name); // Update the city name based on API response
    }

    function searchCity(city) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
        axios.get(`${url}&appid=${apiKey}`).then(getResponse).catch((error) => {
            alert("City not found. Please try again!");
        });
    }

    const searchButton = (event) => {
        event.preventDefault();
        let userInput = document.querySelector("#search-input");

        if (userInput.value) {
            searchCity(userInput.value);
        } else {
            alert("Please enter a city");
        }
    };

    let activities = {
      
    }

    return (
        <>
            <h1>Travel Buddy</h1>
            <div className="search-bar">
                <form className="search-form" id="search-form">
                    <input
                        className="search-input"
                        id="search-input"
                        type="text"
                        placeholder="Search.."
                    />
                    <button className="search-btn" type="submit">Search</button>
                </form>
            </div>
            <div className="weather-box">
                <h2>Weather Box</h2>
                <h2 id="city">{city ? city : "Enter a city to display"}</h2> {/* Displays the city */}
                {temperature !== null && <h2>{Math.round(temperature)}°C</h2>}
            </div>
            <div className='activity'></div>
        </>
    );
}




