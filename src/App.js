import React, { useState } from 'react';
import { fetchWeather } from './api/fetchWeather';
import './App.css';

const App = () => {
    const [value, setValue] = useState('');
    const [weather, setWeather] = useState({});
    const [reqHistory, setReqHistory] = useState([]);

    function addToReqHistory(weatherData) {
        if (reqHistory.length === 0) {
            setReqHistory((prev) => [weatherData, ...prev]);
            return undefined;
        }
        const dataIsExist = reqHistory.find((el) => el.name === weatherData.name);
        if (!dataIsExist) {
            setReqHistory((prev) => {
                const newArrOfWeather = [weatherData, ...prev];
                if (newArrOfWeather.length > 4) newArrOfWeather.length = 4;
                return newArrOfWeather;
            });
        }
    }
    console.log(reqHistory);

    const search = async (e) => {
        try {
            if (e.key === 'Enter') {
                const data = await fetchWeather(value);

                setWeather(data);

                setValue('');

                if (data) {
                    addToReqHistory(data);
                }
            }
        } catch (error) {
            console.log('request error');
        }
    };

    return (
        <div className="main-container">
            <input
                type="text"
                className="search"
                placeholder="Search..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={search}
            />
            {reqHistory[1] && (
                <div
                    className="city fade-in-animation"
                    style={{ flexDirection: 'row', gap: '8px', padding: '10px 4%', fontSize: '.6rem' }}
                >
                    {reqHistory.map((historyWeather) => (
                        <div
                            onClick={() => setWeather(historyWeather)}
                            style={{ cursor: 'pointer' }}
                            keys={historyWeather.name}
                            className={'history city-name'}
                        >
                            {historyWeather.name}
                        </div>
                    ))}
                </div>
            )}
            {weather.name && (
                <div className="city fade-in-animation">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp" style={{ color: `${+weather.main.temp > 15 ? 'coral' : 'cornflowerBlue'}` }}>
                        {Math.round(+weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                            className="city-icon"
                        />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
