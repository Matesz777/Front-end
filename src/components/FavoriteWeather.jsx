import { useSelector, useDispatch } from "react-redux";
import style from './FavoriteWeather.module.css';
import { removeWeather } from "../redux/weatherSlice";
import { Link } from "react-router-dom";
import { Trash } from 'lucide-react';

export const FavoriteWeather = () => {
    const favoriteWeather = useSelector((state) => state.weather.faworiteWeather);
    const dispatch = useDispatch();

    const handleRemoveWeather = (id) => {
        dispatch(removeWeather(id));
    }
    return (
        <div className={style.mainFavWeather}>
            <h2>Favorite Weather</h2>

            {favoriteWeather.map((fav) => (
                <div key={fav.id} className={style.favBox}>
                    <p>{fav.name}</p>
                    <p>{Math.round(fav.main.temp)} °C</p>
                    <p>{fav.weather[0].main}</p>
                    <p>Wilgotność: {fav.main.humidity}%</p>
                    <button onClick={() => handleRemoveWeather(fav.id)} className={style.favButton}><Trash /></button>
                </div>
            ))}
            <Link to="/"><button className={style.backButton}>Go Back</button></Link>
        </div>
    );
}
