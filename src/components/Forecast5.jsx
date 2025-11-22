import { useMemo } from "react";
import style from './Forecast5.module.css';
function Forecast5({ forecastList = [] }) {
  const days = useMemo(() => {
    if (!Array.isArray(forecastList) || forecastList.length === 0) return [];

    const byDay = forecastList.reduce((acc, item) => {
      const [date] = item.dt_txt.split(" ");
      (acc[date] ||= []).push(item);
      return acc;
    }, {});

    const pickNoon = (items) => {
      const noon = items.find(i => i.dt_txt.includes("12:00:00"));
      return noon || items[Math.floor(items.length / 2)];
    };

    const result = Object.entries(byDay).map(([date, items]) => {
      const min = Math.round(Math.min(...items.map(i => i.main.temp_min)));
      const max = Math.round(Math.max(...items.map(i => i.main.temp_max)));

      const rep = pickNoon(items);
      const iconCode = rep?.weather?.[0]?.icon;
      const desc = rep?.weather?.[0]?.description || "";
      const iconUrl = iconCode
        ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
        : null;

      return { date, min, max, iconUrl, desc };
    });

    return result.slice(0, 5);
  }, [forecastList]);

  if (!days.length) return null;

  return (
    <div className={style.mainforecast5}>
      <h3>Prognoza (5 dni):</h3>
      {days.map(d => (
        <div key={d.date} className={style.forecast5}>
          {new Date(d.date).toLocaleDateString("pl-PL", { weekday: "long" })}{" "}
          {d.iconUrl && <img src={d.iconUrl} alt={d.desc} />}{" "}
          {d.max}°C / {d.min}°C
        </div>
      ))}
    </div>
  );
}

export default Forecast5;