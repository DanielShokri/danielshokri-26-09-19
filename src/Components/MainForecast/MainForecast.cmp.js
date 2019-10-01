import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCityWeatherData, fetchCityWeatherCode, fetchFiveDayForecast } from '../../store/weather/weatherActions'
import { addFavorite } from '../../store/favorites/favoritesActions';
import { deleteFavorite } from '../../store/favorites/favoritesActions';
import FiveDayForecast from '../FiveDayForecast/FiveDayForecat.cmp';
import cogoToast from 'cogo-toast';

import './mainforecast.styles.scss';


const MainForecast = ({ cityCode, cityWeather, fiveDayForecast, favorites, isFahrenheit, selectedCity, darkMode, dispatch }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                if (selectedCity === null) {
                    await dispatch(fetchCityWeatherCode())

                    await dispatch(fetchCityWeatherData())

                    await dispatch(fetchFiveDayForecast())
                } else {
                    await dispatch(fetchCityWeatherCode(selectedCity))

                    await dispatch(fetchCityWeatherData(cityCode.Key))

                    await dispatch(fetchFiveDayForecast(cityCode.Key))
                }
            } catch (error) {
                cogoToast.error('Something went wrong... try again later!')
                setIsError(true)
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        let favTimeout;
        if (isFavorite) {
            favTimeout = setTimeout(() => {
                setIsFavorite(false);
                favTimeout = null;
            }, 300);
        }
        return () => {
            if (favTimeout) {
                clearTimeout(favTimeout);
            }
        }
    }, [isFavorite])

    const handleAddToFavorites = () => {
        setIsFavorite(!isFavorite);
        const favoriteLocation = {
            id: cityCode.AdministrativeArea.ID,
            cityName: cityCode.LocalizedName,
            countryName: cityCode.Country.LocalizedName,
            icon: cityWeather.WeatherIcon,
            temperature: cityWeather.Temperature
        }
        dispatch(addFavorite(favoriteLocation))
        cogoToast.success(`Successfully saved ${cityCode.LocalizedName} to favorites`);
    }

    const handleDeleteFromFavorites = () => {
        const existingFav = favorites.find(favorite => favorite.id === cityCode.AdministrativeArea.ID);
        setIsFavorite(!isFavorite);
        dispatch(deleteFavorite(existingFav))
        cogoToast.warn(`Successfully deleted ${cityCode.LocalizedName} from favorites`);
    }

    const FavoriteIcon = () => {
        const existingFav = favorites.findIndex(favorite => favorite.cityName === cityCode.LocalizedName);
        if (existingFav !== -1) {
            return (
                <div className="fav-icon" onClick={handleDeleteFromFavorites}>
                    <div className={`${isFavorite ? 'active' : ''} line`}></div>
                    <div className={`${isFavorite ? 'active' : ''} line`}></div>
                    <div className={`${isFavorite ? 'active' : ''} line`}></div>
                    <div className={`${isFavorite ? 'active' : ''} line`}></div>
                    <div className={`${isFavorite ? 'active' : ''} line`}></div>
                    <div className={`${isFavorite ? 'active' : ''} line`}></div>
                    <div className={`${isFavorite ? 'active' : ''} line`}></div>
                    <div className={`${isFavorite ? 'active' : ''} line`}></div>
                    <div className={`${isFavorite ? 'active' : ''} love heart`}></div>
                </div>
            )
        } else {
            return (
                <div className="fav-icon" onClick={handleAddToFavorites}>
                    <div className={`${isFavorite ? 'active' : ''} line`}></div>
                    <div className={`${isFavorite ? 'active' : ''} line`}></div>
                    <div className={`${isFavorite ? 'active' : ''} line`}></div>
                    <div className={`${isFavorite ? 'active' : ''} line`}></div>
                    <div className={`${isFavorite ? 'active' : ''} line`}></div>
                    <div className={`${isFavorite ? 'active' : ''} line`}></div>
                    <div className={`${isFavorite ? 'active' : ''} line`}></div>
                    <div className={`${isFavorite ? 'active' : ''} line`}></div>
                    <div className={`${isFavorite ? 'active love' : ''} heart`}></div>
                </div>
            )

        }
    }

    return (
        <>
            {
                cityCode && cityCode.Country && cityWeather.Temperature && (
                    <div className="wrapper" >
                        <div className="card">
                            <div className="header">
                                <FavoriteIcon />
                                <div className="center">
                                    <img src={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${cityWeather.WeatherIcon}-s.png`} alt="" />
                                    <h1 className="value">{isFahrenheit ? cityWeather.Temperature.Imperial.Value : cityWeather.Temperature.Metric.Value} {isFahrenheit ? <span>&deg;F</span> : <span>&#176;C</span>}</h1>
                                    <h3>{cityWeather.WeatherText}</h3>
                                </div>
                            </div>
                            <div className={`${darkMode ? 'dark-mode' : ''} details`}>
                                <h1 className="title">{cityCode.LocalizedName}, {cityCode.Country.LocalizedName} </h1>

                                <div className="cards-container">
                                    {fiveDayForecast.DailyForecasts && (
                                        fiveDayForecast.DailyForecasts.map((dayWeather, idx) => (
                                            <FiveDayForecast key={idx} weather={dayWeather} />
                                        ))
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div >
                )
            }
            {
                isError && (
                    <div id="container">
                        <div id="error-box">
                            <div className="shadow move"></div>
                            <div className="message"><h1 className="alert">Error!</h1><p>oh no, something went wrong.</p></div>
                            <button className="button-box" onClick={() => window.location.reload()}><h1 className="red">try again</h1></button>
                        </div>
                    </div>
                )
            }

        </>
    )
}

const mapStateToProps = state => {
    const { cityCode, cityWeather, fiveDayForecast, selectedCity } = state.weatherReducer
    const { favorites, darkMode, isFahrenheit } = state.favoriteReducer
    return {
        cityCode,
        cityWeather,
        fiveDayForecast,
        favorites,
        selectedCity,
        darkMode,
        isFahrenheit
    }
}

export default connect(mapStateToProps)(MainForecast);