import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import "./App.css";
import WeatherDiv from "./components/weatherComponent";
import CityDiv from "./components/cityComponent";
import { Cookies } from "react-cookie";
import { count } from "console";

type ObjType = {
  [index: string]: string;
  "01d": string;
  "01n": string;
  "02d": string;
  "02n": string;
  "03d": string;
  "03n": string;
  "04d": string;
  "04n": string;
  "09d": string;
  "09n": string;
  "10d": string;
  "10n": string;
  "11d": string;
  "11n": string;
};

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

var countNum = 1;

function App() {
  countNum = 1;
  console.log("rendering");
  let cookieBool = false;
  const [city, setCity] = useState();
  const [weather, setWeather]: any = useState();
  const [, updateState] = useState({});
  // console.log("q "+city);
  // console.log("q "+weather);
  useEffect(() => {
    // console.log(city)
  }, [city]);
  useEffect(() => {
    // console.log(weather)
  }, [weather]);
  const forceUpadte = useCallback(() => updateState({}), []);
  const getBookmark = () => {
    const cookies = new Cookies();
    try {
      if (cookies.get("city").length > 0) {
        cookieBool = true;
      } else {
        cookieBool = false;
      }
    } catch (e) { }
  };
  getBookmark();

  const getWeather = async (e: any) => {
    if (city !== undefined) {
      // e.preventDefault();
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=72dc22879afa657a9417a3eb73526904`
      ).then((e) => {
        forceUpadte();
        return e;
      });
      return response.data;
    }
  };
  const handleChange = (event: any) => {
    event.preventDefault();
    setCity(event.target.value);
  };
  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
    } catch { }
    try {
      setWeather(await getWeather(event));
    } catch (e) { }
  };
  const cookies = new Cookies();

  const reanderingB = async (city: any) => {
    await setCity(city);
    // setWeather(await getWeather(city))
  };
  const renderingA = () => {
    const result = [];
    for (const i of cookies.get("city")) {
      result.push(
        <span
          className="fav"
          onClick={
            // eslint-disable-next-line no-loop-func
            (e: any) => {
              console.log(countNum);
              // console.log(e.target.innerText);
              // console.log(city);

              setCity(i);
              if (countNum === 1) {
                // console.log(e);
                handleSubmit(i);
                document.querySelectorAll(".fav").forEach((e: any) => {
                  // console.log(`e${e.innerHTML}, i ${i}`);
                  // console.log(e.innerHTML === ` ${i} `)
                  if (e.innerHTML === ` ${i} `) {
                    // console.log("asd");
                    if (i !== weather?.name) {
                      setTimeout(() => {
                        e.click();
                        countNum = 0;
                      }, 100);
                    }
                  }
                });
              }
            }
          }
        >
          {" "}
          {i}{" "}
        </span>
      );
    }
    return result;
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="box box3">
          <p>
            <code className="code">
              <a
                title=""
                className="button btnPush btnLightBlue"
                onClick={() => {
                  setCity(undefined);
                  setWeather(undefined);
                }}
              >
                {city && weather ? "Clear!" : "Check The Weather!"}
              </a>
            </code>
          </p>
          <div>
            {city && weather ? (
              <div>
                <WeatherDiv weather={weather} />
              </div>
            ) : (
              <CityDiv
                handleSubmit={handleSubmit}
                handleChange={handleChange}
              />
            )}
          </div>
        </div>
        {cookieBool ? (
          <div className="box box2">{renderingA()}</div>
        ) : (
          <div></div>
        )}
      </header>
    </div>
  );
}

export default App;
