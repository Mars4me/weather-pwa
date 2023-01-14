import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'c0989885a1a16c1c43f46f67c8d1fb11';

export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            appid: API_KEY,
        },
    });

    return data;
};
