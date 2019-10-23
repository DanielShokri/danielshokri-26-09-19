import types from "../types";

const INITIAL_STATE = {
  cityCode: [],
  cityWeather: [],
  fiveDayForecast: [],
  selectedCity: null
};

export const weatherReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SELECTED_CITY:
      return {
        ...state,
        selectedCity: action.payload
      };
    case types.FETCH_CITY_CODE:
      return {
        ...state,
        cityCode: action.payload
      };
    case types.FETCH_CITY_WEATHER:
      return {
        ...state,
        cityWeather: action.payload
      };
    case types.FETCH_FIVE_DAY_FORECAST:
      return {
        ...state,
        fiveDayForecast: action.payload
      };
    default:
      return state;
  }
};
