// script.js
const apiKey = 'aa9b9c21b6dc823267a7e5a170300adb'; // Reemplaza con tu clave de OpenWeatherMap
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const errorResult = document.getElementById('errorResult');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const conditions = document.getElementById('conditions');
const humidity = document.getElementById('humidity');
const weatherIcon = document.getElementById('weatherIcon');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value;
    getWeatherData(city);
});


async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es&units=metric`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();


        cityName.textContent = data.name;
        temperature.textContent = `Temperatura: ${data.main.temp}°C`;
        conditions.textContent = `Condiciones: ${data.weather[0].description}`;
        humidity.textContent = `Humedad: ${data.main.humidity}%`;
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;


        weatherResult.classList.remove('hidden');
        errorResult.classList.add('hidden');

    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherResult.classList.add('hidden');
        errorResult.classList.remove('hidden');
    }
}
