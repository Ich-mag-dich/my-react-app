/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-loop-func */
import React, {
  useState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useEffect,
} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import WeatherDiv from "./components/weatherComponent";
import CityDiv from "./components/cityComponent";
import Test from "./components/test";
import NotFound from "./components/notFound";
import HeaderPage from "./components/HeaderPage";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  "13d": string;
  "13n": string;
  "50d": string;
  "50n": string;
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
  "13d": "icon/snow.svg",
  "13n": "icon/snow.svg",
  "50d": "icon.cloudy.svg",
  "50n": "icon/cloudy-night.svg",
};
const appid: string = "72dc22879afa657a9417a3eb73526904";
const appid2: string = "94f4155f866dc90047fcbff89d108fe2";
function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [city, setCity] = useState<string>();
  const [weather, setWeather]: any = useState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies<string>(["city"]);
  const [country, setCountry]: any = useState();
  const [opacityNum, setOpacity] = useState(1);
  const saveCookies = (name: any, value: string[]) => {
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    setCookie(name, value, {
      expires: new Date(nextYear),
    });
  };
  let cookieTrue;
  try {
    cookieTrue = cookies.city[0];
  } catch (error) {
    console.log("asdef");
    saveCookies("city", []);
    cookieTrue = cookies.city[0];
    location.reload();
  }
  const OnSubmit = (data: any) => {
    // getWeather(data.city);
    console.log("on submit");
    getLatLon(data.city);
  };
  const getWeather = (lat: string, lon: string) => {
    axios
      .get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${appid2}`
      )
      .then((x: any) => {
        // console.log(x.data);
        setWeather(x.data);
        setOpacity(1);
        throw Error(x.data);
      })
      .catch((e: any) => {
        try {
          console.log(e.response.data.message);
          alert(`Error: ${e.response.data.message}`);
          setOpacity(1);
        } catch (error) {}
      });
  };
  const getLatLon = (city: string) => {
    setOpacity(0.5);
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${appid}`
      )
      .then((x: any) => {
        console.log(x.data);
        try {
          const lat = x.data[0].lat;
          const lon = x.data[0].lon;
          getWeather(lat, lon);
          const countryName: string = x.data[0].country as string;
          const stateName: string = x.data[0].state as string;
          if (stateName === "England") {
            setCountry(stateName);
          } else {
            setCountry(countryName);
          }

          if (countryName === "KR") {
            setCity(x.data[0]?.local_names?.ko);
          } else {
            setCity(x.data[0]?.name);
          }
          console.log(lat, lon);
        } catch (e) {
          console.log("error");
          alert("Error: 지역명을 찾지 못했습니다.");

          setOpacity(1);
          throw Error(x.data);
        }
      })
      .catch((e: any) => {
        try {
          console.log(e.response.data.message);
          alert(`Error: ${e.response.data.message}`);
          setOpacity(1);
        } catch (e) {}
      });
  };
  const handleOnClick = (e: any, city_name: string) => {
    console.log("handleonclick");
    getLatLon(city_name.toLowerCase());
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header" style={{ opacity: opacityNum }}>
          <HeaderPage></HeaderPage>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <div>
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
                        {weather && city ? "Clear!" : "Check The Weather!"}
                      </a>
                    </code>
                  </p>
                  <div>
                    {weather && city ? (
                      <div>
                        <WeatherDiv
                          weather={weather}
                          countryName={country}
                          cityName={city}
                        />
                      </div>
                    ) : (
                      <CityDiv handleSubmit={OnSubmit} />
                    )}
                  </div>
                </div>

                {cookieTrue ? (
                  <div className="box box2">
                    {cookies.city.map((x: string, i: number) => {
                      return (
                        <div
                          key={i}
                          className="fav"
                          onClick={(e) => handleOnClick(e, x)}
                        >
                          {x}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="box4"></div>
                )}
              </div>
            }
          ></Route>
          <Route path="/test" element={<Test></Test>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
