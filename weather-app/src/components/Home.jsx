import React from 'react';
import { useNavigate } from 'react-router-dom';
import icon from '../assets/welcome-icon.svg';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] p-4">
            <div className="text-center text-white max-w-2xl mx-4">
                {/* Image with Light Shadow */}
                <img
                    src={icon}
                    alt="Weather Icon"
                    className="mx-auto mb-8 animate-fade-in"
                    width={200}
                />

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                    Daily Weather
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in delay-100">
                    Get to know your weather. Stay prepared for the day ahead with real-time updates and forecasts.
                </p>

                {/* Get Started Button */}
                <button
                    onClick={() => navigate('/weather')}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all transform hover:scale-105 animate-fade-in delay-200"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Home;