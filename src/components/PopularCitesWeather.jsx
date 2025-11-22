import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { selectUnits } from "../redux/changeunits";
import { useSelector } from "react-redux";
import style from './PopularCitiesWeather.module.css';


function PopularCitiesWeather({ city = "Warsaw" }) {

    const [temp, setTemp] = useState('');
    const [cityName, setCity] = useState('');
    const [WeatherIcon, setIcon] = useState(null);

    const units = useSelector(selectUnits);
    const unitSymbol = units === "metric" ? "°C" : "°F"; 

    useEffect(() =>{
        async function getWeatherApi(){
            const apikey = '1d5d7a026a76882b3731f7c1f2ce27e7';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=${units}`;
            
            const res = await fetch(url);
            const data = await res.json();
            let icon = data.weather[0].icon
            let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
            setTemp(Math.round(data.main.temp));
            setCity(data.name);
            setIcon(iconUrl);
        }
        getWeatherApi();
    }, [city, units])
    return (
        <div className={style.XD}>
            <div className={style.bigBox}>
                <div className={style.weatherBox}>
                    <img src={WeatherIcon} alt="pogoda" />
                    <p>W mieście <b>{cityName}</b> jest {temp}{unitSymbol}</p>
                    <p><Link to={`/${cityName}`}><button>Szczegóły</button></Link></p>
                </div>
            </div>
        </div>
    );
}

export default PopularCitiesWeather;