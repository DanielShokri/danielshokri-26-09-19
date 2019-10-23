import types from "../types";
import weatherService from "../../services/WeatherService/WeatherService";

export const fetchData = (payload, type) => {
  return {
    payload,
    type
  };
};

export const fetchCityWeatherCode = weatherInput => {
  return async dispatch => {
    try {
      const autoCompleteRes = await weatherService.getCountryCode(weatherInput);
      dispatch(fetchData(autoCompleteRes, types.FETCH_CITY_CODE));
      return autoCompleteRes;
    } catch (error) {
      throw error;
    }
  };
};

export const fetchCityWeatherData = cityKey => {
  return async dispatch => {
    try {
      const fetchCityWeather = await weatherService.getWeather(cityKey);
      dispatch(fetchData(fetchCityWeather, types.FETCH_CITY_WEATHER));
      return fetchCityWeather;
    } catch (error) {
      throw error;
    }
  };
};

export const fetchFiveDayForecast = cityKey => {
  return async dispatch => {
    try {
      const fetchFiveDayWeather = await weatherService.getFiveDayForecast(
        cityKey
      );
      dispatch(fetchData(fetchFiveDayWeather, types.FETCH_FIVE_DAY_FORECAST));
      return fetchFiveDayWeather;
    } catch (error) {
      throw error;
    }
  };
};

export const selectedCity = cityName => ({
  type: types.SELECTED_CITY,
  payload: cityName
});
