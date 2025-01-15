import React from 'react';

function Fahrenheit(){

  let apiUrl = ""
    function showCelsius(event) {
        event.preventDefault();
        let temperatureElement = document.querySelector(".");
        temperatureElement.innerHTML = Math.round(celsiusTemp);
      }
      
      let celsius = document.querySelector("#celsuis-link");
      celsius.addEventListener("click", showCelsius);
      
      function showFahrenheit(event) {
        event.preventDefault();
        let temperatureElement = document.querySelector(".");
        let fahrenheitValue = (celsiusTemp * 9) / 5 + 32;
        temperatureElement.innerHTML = Math.round(fahrenheitValue);
      }
      
      let fahrenheitLink = document.querySelector("#fahrenheit-link");
      fahrenheitLink.addEventListener("click", showFahrenheit);

      let celsiusTemp = "";

      return(
        <div className="unit-switch">
             <button id="fahrenheit-link">Fahrenheit</button>
             <button id="celsuis-link">Celsius</button>
        </div>
      )
      
}

 export default Fahrenheit