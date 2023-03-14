import React from "react";
import { useForm } from "react-hook-form";
import "./css/cityCp.css";
import { Cookies, useCookies } from "react-cookie";

interface ICityProps {
  handleSubmit: (e: any) => void;
}

function CityDiv(props: ICityProps) {
  const { register, handleSubmit } = useForm();
  const [cookies, setCookies] = useCookies(["city"]);
  const test111 = () => {
    let oldCookie: string[];
    if (Symbol.iterator in Object(cookies?.city)) {
      oldCookie = [...cookies.city];
    } else {
      oldCookie = [cookies.city];
    }
    // console.log(oldCookie.at(0))
    if (oldCookie.at(0) === undefined) {
      return false;
    } else {
      return true;
    }
  };
  const removeAllCookie = (e: any) => {
    console.log(test111());
    if (!confirm("모든 즐겨찾기를 삭제할까요?")) {
      e.preventDefault();
    } else {
      if (test111()) {
        const nullCookie: string[] = [];
        setCookies("city", nullCookie);
        alert("모든 즐겨찾기를 삭제했습니다.");
      } else {
        alert("삭제할 즐겨찾기가 없습니다.");
      }
    }
  };
  return (
    <div>
      <p>
        <a
          className="clearBookmarks "
          onClick={() => {
            test111();
            removeAllCookie(Event);
          }}
        >
          Clear Bookmarks
        </a>
      </p>
      <form onSubmit={handleSubmit(props.handleSubmit)}>
        <label>
          <input
            className="inputText"
            type="text"
            placeholder="City"
            {...register("city")}
          />
        </label>
        <input
          className="Submit button btnPush btnLightBlue"
          type="submit"
          value="Check!"
        />
      </form>
    </div>
  );
}

export default CityDiv;
