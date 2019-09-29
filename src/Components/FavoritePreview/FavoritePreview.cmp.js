import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteFavorite } from '../../store/favorites/favoritesActions';
import { selectedCity } from '../../store/weather/weatherActions'
import cogoToast from 'cogo-toast';
import './favoritepreview.styles.scss';


const FavoritePreview = ({ favorite, deleteFavorite, history, selectedCity }) => {

    const handleDelete = () => {
        deleteFavorite(favorite)
        cogoToast.success(`Successfully deleted ${favorite.cityName} from favorites`);
    }

    const handleCityWeatherToHome = () => {
        selectedCity(favorite.cityName);
        history.push('/')
    }

    return (
        <div className="favorite-preview" onClick={handleCityWeatherToHome}>
            <div className="cards-container">
                <div className='box'>
                    <div className="weathercon"><img src={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${favorite.icon}-s.png`} alt="" /></div>
                    <div className="info">
                        <h2 className="location">{favorite.cityName}, {favorite.countryName}</h2>
                        <div className="remove" onClick={handleDelete}>✕ <br /><span>Delete City</span></div>
                        <h2 className="temp">{((favorite.temperature.Imperial.Value - 32) / 1.8).toFixed()} &deg;C | {favorite.temperature.Imperial.Value} &deg;F</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: city => dispatch(deleteFavorite(city)),
    selectedCity: cityName => dispatch(selectedCity(cityName))
})



export default withRouter(connect(null, mapDispatchToProps)(FavoritePreview));