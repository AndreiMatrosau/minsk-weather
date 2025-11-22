// CONSTANTS
const API_KEY = 'YOUR_API_KEY_HERE'; // <--- REMEMBER TO PASTE YOUR KEY HERE
const CITY = 'Minsk';
const UNITS = 'metric';

// DOM ELEMENTS
const tempElement = document.getElementById('temp');
const conditionElement = document.getElementById('condition');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');
const iconElement = document.getElementById('icon');
const dateElement = document.getElementById('date');
const lastUpdatedElement = document.getElementById('last-updated');

async function getWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=${UNITS}`
        );
        const data = await response.json();

        if (data.cod !== 200) {
            alert('Error: ' + data.message);
            return;
        }

        // Extract Data
        const temp = Math.round(data.main.temp);
        const conditionMain = data.weather[0].main; // e.g., "Rain", "Clear"
        const conditionDesc = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const iconCode = data.weather[0].icon;

        // Update UI
        tempElement.innerText = `${temp}°C`;
        conditionElement.innerText = conditionDesc;
        humidityElement.innerText = `${humidity}%`;
        windElement.innerText = `${windSpeed} m/s`;

        // Set Icon
        iconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        iconElement.classList.remove('hidden');

        // Update Background Image
        updateBackground(conditionMain);

        // Update Timestamps
        const now = new Date();
        dateElement.innerText = now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
        lastUpdatedElement.innerText = now.toLocaleTimeString();

    } catch (error) {
        console.error("Error fetching weather:", error);
        conditionElement.innerText = "Failed to load";
    }
}

function updateBackground(condition) {
    let imageUrl = '';

    // Using Unsplash Source for high-quality weather images
    switch (condition) {
        case 'Clear':
            imageUrl = 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1920&auto=format&fit=crop'; // Sunny Minsk/Generic
            break;
        case 'Clouds':
            imageUrl = 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1920&auto=format&fit=crop'; // Cloudy
            break;
        case 'Rain':
        case 'Drizzle':
            imageUrl = 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1920&auto=format&fit=crop'; // Rainy
            break;
        case 'Thunderstorm':
            imageUrl = 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=1920&auto=format&fit=crop'; // Storm
            break;
        case 'Snow':
            imageUrl = 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?q=80&w=1920&auto=format&fit=crop'; // Snow
            break;
        case 'Mist':
        case 'Fog':
        case 'Haze':
            imageUrl = 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=1920&auto=format&fit=crop'; // Foggy
            break;
        default:
            imageUrl = 'https://images.unsplash.com/photo-1558444737-e6223c31e561?q=80&w=1920&auto=format&fit=crop'; // Default City
            break;
    }

    document.body.style.backgroundImage = `url('${imageUrl}')`;
}

// Initial Load
getWeather();
setInterval(getWeather, 600000);
