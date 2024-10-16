var button = document.querySelector('.button');
var inputValue = document.querySelector('.inputValue');
var cityNameElement = document.querySelector('.name'); 
var currentTemp = document.querySelector('.currentTemp');

button.addEventListener('click', function(event) {
    event.preventDefault(); 
    
    
    const city = inputValue.value.trim();
    
    if (city === "") {
        alert("Please enter a city name."); 
        return; 
    }

    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=73102921a96041c57d3a90e735ba4ec3')
    .then(response => {
        if (!response.ok) {
            throw new Error("Geolocation API responded with an error: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Geolocation Data:', data); 

        if (data.length > 0) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            var cityName = data[0].name; 
            console.log('Latitude: ' + lat, 'Longitude: ' + lon, 'City Name: ' + cityName);

            
            cityNameElement.textContent = cityName;

            
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=73102921a96041c57d3a90e735ba4ec3&units=metric')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Weather API responded with an error: " + response.status);
                }
                return response.json();
            })
            .then(weatherData => {
                console.log('Weather Data:', weatherData); 
                currentTemp.textContent = weatherData.main.temp + '°C';
            })
            .catch(err => {
                console.error("Error fetching weather data:", err);
                alert("Error fetching weather data!");
            });
        } else {
            alert("City not found in geolocation API response!");
        }
    })
    .catch(err => {
        console.error("Error fetching geolocation data:", err);
        alert("Error fetching geolocation data!");
    });
});
    