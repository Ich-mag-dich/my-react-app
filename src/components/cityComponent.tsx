import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import "./css/cityCp.css";

interface ICityProps {
  handleSubmit : (e : any) => void
}


function CitiDiv(props : ICityProps) {
  const { register, handleSubmit } = useForm();


  return (
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
  );
}

export default CitiDiv;
