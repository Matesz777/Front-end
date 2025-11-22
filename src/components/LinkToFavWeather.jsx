import { Link } from "react-router-dom";
import style from './LinkToFavWeather.module.css';
import { Star } from 'lucide-react';
import { useState, useEffect } from "react";

export const LinkToFavWeather = () => {

          const [smallerScreen, setSmallerScreen] = useState(window.innerWidth < 1300);
        
          useEffect(() => {
            const handleResize = () => {
              setSmallerScreen(window.innerWidth < 1300);
            };
            window.addEventListener('resize', handleResize);
            return () => { window.removeEventListener('resize', handleResize); }; 
          }, []);

    return (
        <div className={style.favbutton}>
            <Link to="/favorites">
                <button>{smallerScreen ? <Star/> : "Favorite Weather" }</button>
            </Link>
        </div>
    );
}