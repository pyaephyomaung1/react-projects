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
            console.log(data);
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] p-4">
            <div className="container mx-auto p-8 bg-[#1A1A1A] rounded-2xl shadow-2xl max-w-md border border-[#333333]">
                {/* Search Form */}
                <form className="mb-8" onSubmit={handleSubmit}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-400 sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            ref={inputRef}
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-gray-200 placeholder-gray-500 border border-[#333333] rounded-lg bg-[#2A2A2A] focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                            placeholder="Search for a city..."
                            required
                        />
                        <button
                            type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-600 font-medium rounded-lg text-sm px-4 py-2 transition-all"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {/* Date Section */}
                <div className="flex justify-between items-center p-4 mb-6 bg-[#2A2A2A] rounded-lg opacity-80 hover:opacity-100 transition-all duration-200 ease-in-out">
                    <p className="text-white text-lg font-semibold">Today</p>
                    <p className="text-gray-400 text-sm">{new Date().toLocaleDateString()}</p>
                </div>

                {/* Weather Display */}
                {weather && (
                    <div className="text-center animate-fade-in">
                        {/* Weather Icon */}
                        <img
                            src={weather.icon}
                            alt="Weather Icon"
                            className="mx-auto w-40 h-40 transform hover:scale-110 transition-all duration-200 ease-in-out"
                        />

                        {/* Temperature */}
                        <p className="text-6xl font-light text-white mt-6">{weather.temperature}&#176;C</p>

                        {/* Location */}
                        <p className="text-2xl text-gray-300 mt-4 font-semibold">{weather.location} , {weather.country}</p>

                        {/* Weather Description */}
                        <p className="text-xl text-gray-400 mt-2 capitalize">{weather.description}</p>

                        {/* Additional Weather Details */}
                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="flex items-center justify-center p-3 bg-[#2A2A2A] rounded-xl hover:bg-[#333333] transition-all">
                                <img src={humidity_icon} alt="Humidity" className="w-12 h-12" />
                                <div className="ml-4">
                                    <p className="text-sm text-gray-400">Humidity</p>
                                    <p className="text-xl font-light text-white">{weather.humidity}%</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center p-3 bg-[#2A2A2A] rounded-xl hover:bg-[#333333] transition-all">
                                <img src={wind_icon} alt="Wind" className="w-12 h-12" />
                                <div className="ml-4">
                                    <p className="text-sm text-gray-400">Wind Speed</p>
                                    <p className="text-xl font-light text-white">{weather.windSpeed} km/h</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;