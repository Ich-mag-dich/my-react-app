import React, { useCallback, useState } from "react";
import "./css/weatherCp.css";
import { WeatherIcons } from "../App";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const WeatherInfoIcons = {
  sunset: "my-weather-app/icon/temp.svg",
  sunrise: "my-weather-app/icon/temp.svg",
  humidity: "my-weather-app/icon/humidity.svg",
  wind: "my-weather-app/icon/wind.svg",
  pressure: "my-weather-app/icon/pressure.svg",
};

const marginAutoLeft = {
  margin: "auto",
  marginLeft: "10px",
};

function WeatherDiv(props: any) {
  const { weather } = props;

  const unixTimeSr = weather?.sys?.sunrise;
  const unixTimeSs = weather?.sys?.sunset;
  const dateSr = new Date(unixTimeSr * 1000);
  const dateSs = new Date(unixTimeSs * 1000);

  const iconname: string = weather.weather[0].icon as string;
  return (
    <div className="weatherCpBox">
      <div className="nameBox">
        <span className="temp1">
          <span className="temp2">{`${Math.floor(
            weather?.main?.temp - 273
          )}°C`}</span>{" "}
          | {weather?.weather[0]?.description}
        </span>
        <img alt="" className="weatherImg" src={WeatherIcons[iconname]} />
      </div>
      <span className="nameCountry">
        {weather?.name}, {weather?.sys?.country}
        <button
          className="bookmark"
          onClick={() => {
            let oldCookie: any[] = [];
            try {
              for (const i of cookies.get("city")) {
                oldCookie.push(i);
              }
            } catch (e) {
              console.log(e);
            }
            if (!oldCookie.includes(weather?.name)) {
              oldCookie.push(weather?.name);
              alert("즐겨찾기에 추가가 완료되었습니다.");
            } else {
              const indexA = oldCookie.indexOf(weather?.name);
              if (indexA > -1) {
                oldCookie.splice(indexA, 1);
                document.querySelectorAll(".fav").forEach((i: any) => {
                  if (i.innerText === weather?.name) {
                    i.remove();
                  }
                });
              }
            }

            // oldCookie.push(cookies.get("city"))
            cookies.set("city", oldCookie);
            console.log(cookies.get("city"));
          }}
        >
          Bookmark
        </button>
      </span>
      <span className="weatherinfo">Weather Info</span>

      <div className="divBox">
        <div className="inBoxDiv">
          <img alt="" className="icons" src={"icon/temp.svg"} />
          <span className="inSpan" style={marginAutoLeft}>
            <span className="ininSpan">
              {" "}
              {dateSr.getHours()} : {dateSr.getMinutes()} | Sunrise
            </span>
            <span className="ininSpan">
              {" "}
              {dateSs.getHours()} : {dateSs.getMinutes()} | Sunset
            </span>
          </span>
        </div>
        <div className="inBoxDiv">
          <img alt="" className="icons" src={"icon/humidity.svg"} />
          <span className="inSpan">
            {weather?.main?.humidity}
            <span className="ininSpan">Humidity</span>
          </span>
        </div>
        <div className="inBoxDiv">
          <img alt="" className="icons" src={"icon/wind.svg"} />
          <span className="inSpan">
            {weather?.wind?.speed}
            <span className="ininSpan">Wind Speed</span>
          </span>
        </div>
        <div className="inBoxDiv">
          <img alt="" className="icons" src={"icon/pressure.svg"} />
          <span className="inSpan">
            {weather?.main?.pressure}
            <span className="ininSpan">Pressure</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default WeatherDiv;
