import types from '../types';
import weatherService from '../../services/WeatherService/WeatherService';

export const fetchData = (payload, type) => {
    return {
        payload,
        type
    }
};

export const fetchCityWeatherCode = weatherInput => {
    return async (dispatch) => {
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
    return dispatch => {
        return weatherService.getWeather(cityKey)
            .then(response => {
                dispatch(fetchData(response, types.FETCH_CITY_WEATHER))
                return response;
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const fetchFiveDayForecast = cityKey => {
    return dispatch => {
        return weatherService.getFiveDayForecast(cityKey)
            .then(response => {
                dispatch(fetchData(response, types.FETCH_FIVE_DAY_FORECAST))
                return response;
            })
            .catch(error => {
                throw (error);
            });
    };
};


export const selectedCity = cityName => ({
    type: types.SELECTED_CITY,
    payload: cityName
})