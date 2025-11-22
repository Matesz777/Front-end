import { useSelector, useDispatch } from "react-redux";
import { addWeatherToFavorite } from "../redux/weatherSlice";
import { selectUnits } from "../redux/changeunits";
import style from './LastSeenWeather.module.css';
import { Star } from 'lucide-react';

export const LastSeenWeather = () => {
    const weatherHistory = useSelector((state) => state.weather.weatherHistory);
    const units = useSelector(selectUnits);
    const unitSymbol = units === "metric" ? "°C" : "°F";
    const dispatch = useDispatch();
    const handleAddToFavorite = (weatherItem) => {
        dispatch(addWeatherToFavorite(weatherItem))
    }
    return (
    <div>
      <div className={style.mediaQ}>
        <h2>Last seen Weather</h2>

      {weatherHistory.map((weatherH) => (
        <div key={weatherH.id} className={style.bigBoxHistory}>
          {weatherH.main && weatherH.weather && (
            <div  className={style.mainHistory}>
              <p>{weatherH.name}</p>
              <p>{Math.round(weatherH.main.temp)}{unitSymbol}</p>
              <p>{weatherH.weather[0].main}</p>

              <button onClick={() =>handleAddToFavorite(weatherH)} className={style.favButton} alt="Add to favorites">
                <Star />
              </button>
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
    )
}