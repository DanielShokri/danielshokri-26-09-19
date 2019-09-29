import types from '../types';

export const addFavorite = city => ({
    type: types.ADD_FAVORITE_CITY,
    payload: city
})

export const deleteFavorite = city => ({
    type: types.DELETE_FAVORITE_CITY,
    payload: city
})

export const setDarkMode = isDark => ({
    type: types.SET_DARK_MODE,
    payload: isDark
})

export const setFahrenheitToggle = isFahrenheit => ({
    type: types.SET_FAHRENHEIT_CELSIUS,
    payload: isFahrenheit
})

