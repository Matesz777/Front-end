import { useEffect, useState } from "react";
import style from './WeatherSearch.module.css';
import { useSelector } from "react-redux";
import { selectUnits } from "../redux/changeunits";
import { addWeather } from "../redux/weatherSlice";
import { useDispatch } from "react-redux";

const api = {
  key: '1d5d7a026a76882b3731f7c1f2ce27e7',
  base: 'https://api.openweathermap.org/data/2.5/weather?',
};

function WeatherSearch() {
  const [searchButton, setSearchButton] = useState('');
  const [weather, setWeather] = useState(null);
  const [lastCity, setLastCity] = useState('');

  const units = useSelector(selectUnits);
  const unitSymbol = units === "metric" ? "°C" : "°F";
  const dispatch = useDispatch();
  const search = async () => {
    const city = searchButton.trim();
    if (!city) return;
    const url = `${api.base}q=${encodeURIComponent(city)}&appid=${api.key}&units=${units}&lang=pl`;
    const res = await fetch(url);
    const result = await res.json();



    console.log("SearchButton: ",searchButton)
    setWeather(result);
    setLastCity(result?.name || city);
    dispatch(addWeather(result)); 
    console.log("Weather: ",weather)
  };

  useEffect(() => {
    if (!lastCity) return;
    (async () => {
      const url = `${api.base}q=${encodeURIComponent(lastCity)}&appid=${api.key}&units=${units}&lang=pl`;
      const res = await fetch(url);
      const result = await res.json();
      setWeather(result);
    })();
  }, [units, lastCity]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") search();
  };

  return (
    <div className={style.searchdiv}>
      <div className={style.searchbar}>
        <input
          className={style.searchInput}
          type="text"
          placeholder="Enter City Name..."
          value={searchButton}
          onChange={(e) => setSearchButton(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button onClick={search}>Search</button>
      </div>

      <div className={style.weatherResult}>
        {weather?.main && (
          <div>
            <p>{weather.name}</p>
            <p>{Math.round(weather?.main.temp)} {unitSymbol}</p>
            <p>{weather.weather?.[0]?.main}</p>
            <p>{weather?.main.humidity}% Wiatr {weather?.wind.speed} m/s</p>
            
        </div>
        )}
      </div>
    </div>
  );
}

export default WeatherSearch;
