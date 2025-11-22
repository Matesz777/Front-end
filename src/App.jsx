import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeatherSearch from './components/WeatherSearch'
import PopularCitiesWeather from './components/PopularCitesWeather'
import TempChange from './components/TmpChange'
import { LastSeenWeather } from './components/lastSeenWeather'
import { FavoriteWeather } from './components/FavoriteWeather'
import { LinkToFavWeather } from './components/LinkToFavWeather'

function App() {
  return (
    <>
      <div className="main">
          <div className="columnn">
            <div className="History">
              <LastSeenWeather />
            </div>

            <div className="weatherserachbox">
              <h1>Your Weather</h1>
              <WeatherSearch />
            </div>

            <div className="navbar">
              <LinkToFavWeather />
              <TempChange />
            </div>
          </div>
          <div className="popularcities">
            <div className="popcities"><PopularCitiesWeather city="Warsaw"/></div>
            <div className="popcities"><PopularCitiesWeather city="London"/></div>
            <div className="popcities"><PopularCitiesWeather city="New York"/></div>
            <div className="popcities"><PopularCitiesWeather city="Tokyo"/></div>
            <div className="popcities"><PopularCitiesWeather city="Sydney"/></div>
          </div>
      </div>
    </>
  )
}

export default App
