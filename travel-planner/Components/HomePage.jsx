import React, { useEffect, useState } from 'react';
import "../src/App.css";
import axios from 'axios';

export default function HomePage() {
    const [weatherData, setWeatherData] = useState({ ready: false });
    const [forecastData, setForecastData] = useState([]);
    const [temperature, setTemperature] = useState(null);
    const [city, setCity] = useState("");
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

    const getForecast = (coordinates) => {
      let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(showForecast);
    };

    const showForecast = (response) => {
      let forecast = response.data.daily;
      setForecastData(forecast.slice(0, 6));
    };

    const dayFormat = (timestamp) => {
      const date = new Date(timestamp * 1000);
      const options = { weekday: 'short' };
      return date.toLocaleDateString(undefined, options);
    };

    const renderForecast = () => {
      return forecastData.map((forecastDay, index) => (
        <div className="col-2" key={index}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <span className="forecast-day">{dayFormat(forecastDay.dt)}</span>
              </h5>
              <img
                src={`http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png`}
                alt="Weather icon"
                className="card-img-top"
              />
              <h6 className="card-subtitle mb-2 text-body-secondary">
                <span className="forecast-max">
                  {Math.round(forecastDay.temp.max)}°
                </span>
                <span className="forecast-min">
                  {Math.round(forecastDay.temp.min)}°
                </span>
              </h6>
            </div>
          </div>
        </div>
      ));
    };

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
        setCity(response.data.name);
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

    let activities = [
      ["Go hiking", "Have a picnic in the park", "Visit a beach or go swimming", "Explore a botanical garden or nature reserve"],
      ["Take a leisurely walk or jog", "Visit an art gallery or museum"]
  ];
  
    

    return (
        <>
            <h1>Travel Buddy</h1>
            <hr/>
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
                <h2 id="city">{city ? city : "Enter a city to display"}</h2> 
                {temperature !== null && <h2>{Math.round(temperature)}°C</h2>}
                <h2>6 Days Forecast</h2>
                <div className="row">{renderForecast()}</div>
            </div>
            <div className='activity'></div>
        </>
    );
}




