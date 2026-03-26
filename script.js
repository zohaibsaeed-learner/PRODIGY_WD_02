const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'a43d90c90bmsh4be574d2b75c6c1p191e75jsnd6ab4712123f',
        'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
    }
};

// 1. Function to update the Main Cards (Used for Search and Initial Load)
const updateMainWeather = (city) => {
    // Update the Header Title in HTML
    document.querySelector('h1.text-center').innerHTML = `Weather for ${city}`;

    fetch(`https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=c`, options)
        .then(response => response.json())
        .then(response => {
            const obs = response.current_observation;
            const forecast = response.forecasts[0];

            // Mapping to your HTML IDs
            document.getElementById('temp').innerHTML = obs.condition.temperature;
            document.getElementById('min_temp').innerHTML = forecast.low;
            document.getElementById('max_temp').innerHTML = forecast.high;
            document.getElementById('humidity').innerHTML = obs.atmosphere.humidity;
            document.getElementById('feels_like').innerHTML = obs.wind.chill;
            document.getElementById('wind_speed').innerHTML = obs.wind.speed;
        })
        .catch(err => {
            console.error("Fetch error:", err);
            alert("Could not find that city. Please try again.");
        });
};

// 2. Function to update individual rows in your "Common Places" table
const fetchTableData = (cityQuery, htmlId) => {
    fetch(`https://yahoo-weather5.p.rapidapi.com/weather?location=${cityQuery}&format=json&u=c`, options)
        .then(response => response.json())
        .then(response => {
            const obs = response.current_observation;
            
            document.getElementById(`${htmlId}_temp`).innerHTML = obs.condition.temperature + '°';
            document.getElementById(`${htmlId}_feels_like`).innerHTML = obs.wind.chill + '°';
            document.getElementById(`${htmlId}_sky`).innerHTML = obs.condition.text;
            document.getElementById(`${htmlId}_sunrise`).innerHTML = obs.astronomy.sunrise;
            document.getElementById(`${htmlId}_sunset`).innerHTML = obs.astronomy.sunset;
        })
        .catch(err => console.error(`Error fetching table data for ${cityQuery}:`, err));
};

// 3. Event Listener for the Search Button
document.getElementById('submitBtn').addEventListener('click', (e) => {
    e.preventDefault(); // Stop page refresh
    const cityValue = document.getElementById('cityInput').value;
    if (cityValue) {
        updateMainWeather(cityValue);
    }
});

// 4. Initial Load: Populate everything when the page opens
updateMainWeather('Islamabad');
fetchTableData('delhi', 'delhi');
fetchTableData('london', 'london');
fetchTableData('new york', 'new_york');
fetchTableData('karachi', 'karachi');
fetchTableData('peshawar', 'peshawar');