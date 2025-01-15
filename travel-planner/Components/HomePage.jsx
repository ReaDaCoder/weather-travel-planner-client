import React, { useEffect, useState } from 'react';
import "../src/App.css";
import axios from 'axios';
import WeatherIcon from './WeatherIcon';

export default function HomePage() {
    const [weatherData, setWeatherData] = useState({ ready: false });

    let city = "London";
    let apiKey = "5d7b9ccc3e46361f64b317d8161bb16e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},uk&appid=${apiKey}&units=metric`;


  return (
    <>
      <h1>Hello World</h1>
      <div className="search-bar">
        <input className="input" type="text" placeholder="Search.." />
        <button className="search-btn">Search</button>
      </div>
      <div className="weather-box">
        <h2>Weather Box</h2>
        <h2 id="city">{Math.round(temperature)}</h2>
      </div>
    </>
  );
}
