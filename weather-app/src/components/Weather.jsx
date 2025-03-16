import React, { useEffect, useState, useRef } from 'react';
import countryCodes from '../country-code.json';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
    const [weather, setWeather] = useState(false);
    const inputRef = useRef();

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            const countryCode = data.sys.country;
            const country = countryCodes.find((c) => c.Code === countryCode);
            const icon = allIcons[data.weather[0].icon];
            setWeather({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                country: country ? country.Name : "Unknown",
                description: data.weather[0].description,
                icon: icon,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const city = inputRef.current.value;
        if (city) {
            search(city);
            inputRef.current.value = '';
        }
    };

    useEffect(() => {
        search("yangon");
    }, []);

    const getWeatherSuggestion = (weatherDescription, temperature) => {
        const description = weatherDescription.toLowerCase();
        let suggestion = "";

        // Temperature-based suggestions (priority)
        if (temperature >= 30) {
            suggestion += "It's extremely hot! Stay hydrated, avoid direct sunlight, and wear light clothing 🥵. ";
        } else if (temperature >= 25) {
            suggestion += "It's quite warm. Drink plenty of water and wear sunscreen ☀️. ";
        } else if (temperature >= 15) {
            suggestion += "The weather is pleasant. ";
        } else if (temperature >= 5) {
            suggestion += "It's chilly. Wear a jacket or sweater to stay warm 🧥. ";
        } else if (temperature >= -10) {
            suggestion += "It's very cold! Bundle up in layers and limit time outdoors 🥶. ";
        } else {
            suggestion += "It's freezing! Stay indoors if possible and wear heavy winter gear ❄️. ";
        }

        // Weather-based suggestions (complementary)
        if (description.includes("rain")) {
            suggestion += "It's also raining, so don't forget to bring an umbrella ☔.";
        } else if (description.includes("cloud")) {
            suggestion += "The sky is cloudy, so a light jacket might be useful 🌥️.";
        } else if (description.includes("clear")) {
            suggestion += "The sky is clear and sunny, so enjoy the daylight ☀️.";
        } else if (description.includes("snow")) {
            suggestion += "It's also snowing, so be cautious on slippery surfaces ❄️.";
        } else if (description.includes("drizzle")) {
            suggestion += "There's a light drizzle, so a raincoat or umbrella would be handy 🌧️.";
        } else if (description.includes("wind")) {
            suggestion += "It's also windy, so hold onto your hat and be careful of gusts 💨.";
        } else {
            suggestion += "Enjoy the weather! 😊";
        }

        return suggestion;
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <div
                className="container mx-auto p-8 bg-gray-900 rounded-2xl shadow-lg max-w-lg transition-all">
                <h1 className="text-2xl font-bold text-center mb-6 text-white">Weather Forecast</h1>
                <form className="mb-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="search"
                            ref={inputRef}
                            className="block w-full p-4 pl-6 text-sm text-white placeholder-gray-400 rounded-xl bg-gray-800/50 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                            placeholder="Enter city name..."
                            required
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-all shadow-md hover:shadow-xl"
                        >
                            Search
                        </button>
                    </div>
                </form>
                <hr className={'text-white opacity-20 mt-10 mb-4'}/>

                {weather && (
                    <div className="text-center p-6 rounded-2xl  shadow-lg">
                        <div className="flex justify-center items-center mb-4">
                            <img
                                src={weather.icon}
                                alt="Weather Icon"
                                className="w-32 h-32 transition-all hover:scale-110 filter drop-shadow-lg"
                            />
                        </div>
                        <p className="text-6xl font-light bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent mt-2">{weather.temperature}°C</p>
                        <p className="text-2xl text-white mt-2 font-bold tracking-wide">{weather.location}, {weather.country}</p>
                        <p className="text-lg text-teal-200 mt-1 capitalize">{weather.description}</p>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div
                                className="flex items-center p-4 bg-gray-800/70 rounded-xl border border-teal-700/30 transition-all hover:border-teal-500/50">
                                <img src={humidity_icon} alt="Humidity" className="w-10 h-10 mr-4"/>
                                <div className="text-left">
                                    <p className="text-sm text-teal-300">Humidity</p>
                                    <p className="text-xl font-bold text-white">{weather.humidity}%</p>
                                </div>
                            </div>
                            <div
                                className="flex items-center p-4 bg-gray-800/70 rounded-xl border border-teal-700/30 transition-all hover:border-teal-500/50">
                                <img src={wind_icon} alt="Wind" className="w-10 h-10 mr-4"/>
                                <div className="text-left">
                                    <p className="text-sm text-teal-300">Wind Speed</p>
                                    <p className="text-xl font-bold text-white">{weather.windSpeed} km/h</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {weather && (
                    <div className="text-center animate-fade-in">
                        {/* Weather Icon, Temperature, Location, Description, etc. */}

                        {/* Weather Suggestion */}
                        <p className="text-lg text-gray-400 mt-6 italic neon-text">
                            {getWeatherSuggestion(weather.description)}
                        </p>

                        {/* Additional Weather Details */}
                        <div className="grid grid-cols-2 gap-6 mt-8">
                            {/* Humidity and Wind Speed */}
                        </div>
                    </div>
                )}

            </div>
        </div>

    );
};

export default Weather;
