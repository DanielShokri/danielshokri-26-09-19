import axios from "axios";

const weatherApi = "GEodkJ6YjTCvyszsHyu2ACeDeTBvqjac";

async function getCountryCode(userCity = "tel aviv") {
  try {
    const res = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${weatherApi}&q=${userCity}`
    );
    return res.data[0];
  } catch (err) {
    throw err;
  }
}

async function getWeather(cityCode = "215845") {
  try {
    const res = await axios.get(
      `https://dataservice.accuweather.com/currentconditions/v1/${cityCode}?apikey=${weatherApi}`
    );
    return res.data[0];
  } catch (err) {
    throw err;
  }
}

async function getFiveDayForecast(cityCode = "215845") {
  try {
    const res = await axios.get(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityCode}?apikey=${weatherApi}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
}

export default {
  getCountryCode,
  getWeather,
  getFiveDayForecast
};
