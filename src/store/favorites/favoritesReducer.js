import types from "../types";
import FavoriteService from "../../services/FavoriteService/FavoriteService";

const INITIAL_STATE = {
  favorites: [],
  darkMode: false,
  isFahrenheit: false
};

export const favoriteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_FAVORITE_CITY:
      return {
        ...state,
        favorites: FavoriteService.addCityToFavorites(
          state.favorites,
          action.payload
        )
      };
    case types.DELETE_FAVORITE_CITY:
      return {
        ...state,
        favorites: FavoriteService.deleteFavorite(
          state.favorites,
          action.payload
        )
      };
    case types.SET_DARK_MODE:
      return {
        ...state,
        darkMode: action.payload
      };
    case types.SET_FAHRENHEIT_CELSIUS:
      return {
        ...state,
        isFahrenheit: action.payload
      };
    default:
      return state;
  }
};
