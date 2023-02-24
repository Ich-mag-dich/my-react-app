/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-loop-func */
import React, {
  useState,
  useEffect,
  MouseEventHandler,
} from "react";
import axios from "axios";
import "./App.css";
import WeatherDiv from "./components/weatherComponent";
import CityDiv from "./components/cityComponent";
import { Cookies, useCookies } from "react-cookie";

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

function App() {
  console.log("rendering");
  let cookieBool = false;
  const [city, setCity] = useState<string>(undefined);
  const [weather, setWeather]: any = useState();
  const [cookies, setCookie] = useCookies<string>(["city"]);

  /*   const reanderingB = async (city: any) => {
    await setCity(city);
    // setWeather(await getWeather(city))
  }; */
  /* const renderingA = () => {
    const result = [];
    for (const i of cookies.get("city")) {
      console.log(i)
      result.push(
        <span
          className="fav"
          onClick={
            (e: any) => {
              setCity(i);
              if (countNum === 1) {
                handleSubmit(i);
                document.querySelectorAll(".fav").forEach((e: any) => {
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
  }; */
  const OnSubmit = (data : any) => {
    getWeather(data.city)
  }
  const getWeather = (city : string ) => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=72dc22879afa657a9417a3eb73526904`).then((x) =>{
        console.log(x.data);
        setWeather(x.data);
        throw Error(x.data);
      }).catch(e => {
        console.log(e);
        alert(`Error: ${e.response.data.message}`);
      })
      
  }
  const handleOnClick = (e: any , city_name : string) => {
    getWeather(city_name.toLowerCase())
  };  

  return (
    <div className="App">
      <header className="App-header">
        <div className="box box3">
          <p>
            <code className="code">
              <a
                className="button btnPush btnLightBlue"
                onClick={() => {
                  setCity(undefined);
                  setWeather(undefined);
                }}
              >
                {weather ? "Clear!" : "Check The Weather!"}
              </a>
            </code>
          </p>
          <div>
            {weather ? (
              <div>
                <WeatherDiv weather={weather} />
              </div>
            ) : (
              <CityDiv handleSubmit={OnSubmit} />
            )}
          </div>
        </div>
        <div className="box box2">
          {cookies.city ? (
            cookies.city.map((x: string, i: number) => {
              return (
                <div key={i} className="fav" onClick={(e) => handleOnClick(e,x)}>
                  {x}
                </div>
              );
            }
            
            )

            ) : (
              <></>
              )}
              </div>
      </header>
    </div>
  );
}

export default App;
