import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import WeatherDiv from './components/weatherComponent';
import CityDiv from './components/cityComponent';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

type ObjType = {
  [index: string]: string
  "01d": string
  "01n": string
  "02d": string
  "02n": string
  "03d": string
  "03n": string
  "04d": string
  "04n": string
  "09d": string
  "09n": string
  "10d": string
  "10n": string
  "11d": string
  "11n": string
}

export const WeatherIcons: ObjType = {
  "01d": "icon/sunny.svg",
  "01n": "icon/night.svg",
  "02d": "icon/day.svg",
  "02n": "icon/cloudy-night.svg",
  "03d": "icon/cloudy.svg",
  "03n": "icon/cloudy.svg",
  "04d": "icon/perfect-day.svg",
  "04n": "icon/cloudy-night.svg",
  "09d": "icon/rain.svg",
  "09n": "icon/rain-night.svg",
  "10d": "icon/rain.svg",
  "10n": "icon/rain-night.svg",
  "11d": "icon/storm.svg",
  "11n": "icon/storm.svg",
  "50n": "icon/cloudy.svg",
};

function App() {
  const [city, setCity] = useState();
  const [weather, setWeather] = useState();
  // useEffect(() => {
  //   console.log(city);
  // }, [city]);
  // useEffect(() => {
  //   console.log(weather);
  // }, [weather])
  const getWeather = async (e: any) => {
    if (city !== undefined) {

      e.preventDefault();
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=72dc22879afa657a9417a3eb73526904`,
      );
      return response.data
    }
  };
  const handleChange = (event: any) => {
    event.preventDefault();
    setCity(event.target.value)
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setWeather(await getWeather(event));
    } catch (e) { }
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="box">

          <p>
            <code className='code' >
              <a title="" className="button btnPush btnLightBlue" onClick={() => {
                setCity(undefined);
                setWeather(undefined);
              }}>{city && weather ? ("Clear!") : ("Check The Weather!")}</a>
              {/* <button onClick={() => {
                setCity(undefined);
                setWeather(undefined);
              }}>
                Check the Weather!
              </button> */}
            </code>
          </p>
          {/* <form onSubmit={handleSubmit}>
          <label>
          City:
            <input type="text" onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form> */}
          <div>
            {city && weather ? (
              <div>
                <WeatherDiv weather={weather} />
              </div>
            ) : (
              <CityDiv handleSubmit={handleSubmit} handleChange={handleChange} />
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
