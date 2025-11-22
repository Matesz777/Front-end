import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Forecast5 from "./Forecast5";
import { useSelector } from "react-redux";
import { selectUnits } from "../redux/changeunits";
import style from './ClickedCities.module.css';

function ClickedCities(){
  const {cityName} = useParams();
  const [data, setData] = useState(null);
  const [WeatherIcon, setIcon] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [precip, setPrecip] = useState(null);

  const units = useSelector(selectUnits);
  const unitSymbol = units === "metric" ? "°C" : "°F";

  useEffect(() =>{
    async function getWeatherApiData(){
      const apikey = '1d5d7a026a76882b3731f7c1f2ce27e7';

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apikey}&units=${units}&lang=pl`;
      const res = await fetch(url);
      const APIdata = await res.json();

      const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${apikey}&units=${units}&lang=pl`;
      const res2 = await fetch(url2);
      const APIdata2 = await res2.json();
      
      let icon = APIdata.weather[0].icon;
      let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      setIcon(iconUrl);
      setData(APIdata);
      setForecast(APIdata2.list);

      const slot = Array.isArray(APIdata2.list) ? APIdata2.list[0] : null;
      if (slot) {
        const pop = Math.round((slot.pop || 0) * 100);
        const rain = slot.rain?.["3h"] || 0;
        const snow = slot.snow?.["3h"] || 0;
        const type = rain > 0 ? "deszcz" : snow > 0 ? "śnieg" : "brak opadów";
        const amount = rain > 0 ? rain : snow;
        setPrecip({ pop, type, amount });
      } else {
        setPrecip({ pop: 0, type: "brak opadów", amount: 0 });
      }
    }
    getWeatherApiData();
  }, [cityName, units]);

  if (!data) return <p>Loading...</p>;
  
  return (
    <div className={style.maincontainer}>
      <div className={style.weatherinfo}>
        <img src={WeatherIcon} alt="pogoda" />
        <p>W mieście <b>{data.name}</b> jest {Math.round(data.main.temp)} {unitSymbol}</p>
        <p>Wilogtność <b>{data.main.humidity}% </b> Wiatr {data.wind.speed} m/s</p>
        {precip && (
          <p>
            Rodzaj opadów: <b>{precip.type}</b> <b>{precip.pop}%</b> • ilość <b>{precip.amount} mm</b>
          </p>
        )}

        <Link to="/">
          <button>Go back Home</button>
        </Link>
      </div>
      <div className={style.forecast5}>
        {Array.isArray(forecast) && <Forecast5 forecastList={forecast} />}
      </div>
    </div>
  );
};

export default ClickedCities;
