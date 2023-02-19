import React from "react";
import "./css/cityCp.css";

function CitiDiv(props: any) {
  const { handleSubmit, handleChange } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          className="inputText"
          type="text"
          placeholder="City"
          onChange={handleChange}
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
