import React, { useState } from "react";
import { connect } from "react-redux";
import {
  fetchFiveDayForecast,
  fetchCityWeatherCode,
  fetchCityWeatherData
} from "../../store/weather/weatherActions";
import cogoToast from "cogo-toast";
import "./inputform.styles.scss";

const InputForm = ({ darkMode, dispatch }) => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    const englishRegex = /^[a-zA-Z ]+$/;
    if (!userInput.match(englishRegex))
      return cogoToast.warn("Only English letters please!");

    cogoToast.loading("Loading your data...").then(() => {
      dispatch(fetchCityWeatherCode(userInput))
        .then(data => {
          dispatch(fetchCityWeatherData(data.Key));
          dispatch(fetchFiveDayForecast(data.Key));
          cogoToast.success("Data Successfully Loaded");
        })
        .catch(() => {
          cogoToast.warn(`can't find ${userInput}, try again!`);
        });
    });
  };

  return (
    <div className="input-container" style={{ maxWidth: "270px" }}>
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <input
          className="input is-info"
          type="text"
          value={userInput}
          label="userInput"
          name="userInput"
          onChange={e => setUserInput(e.target.value)}
          placeholder="Search Location..."
        />
        <button className={`${darkMode ? "is-light" : "is-dark"} button`}>
          Search
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  const { cityCode } = state.weatherReducer;
  const { darkMode } = state.favoriteReducer;
  return {
    cityCode,
    darkMode
  };
};

export default connect(mapStateToProps)(InputForm);
