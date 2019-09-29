import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Zoom from 'react-reveal/Zoom';

import './fivedayforecast.styles.scss';

const FiveDayForecast = ({ weather, isFahrenheit }) => {


    console.log(weather)
    return (
        <Zoom>
            <div className="cards-container">
                <div className='box'>
                    <div className="weathercon"><img src={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/0${weather.Day.Icon}-s.png`} alt="" /></div>
                    <div className="info">
                        <h2 className="location"><Moment format="dddd">{weather.Date}</Moment></h2>
                        <p className="date"> <Moment format="ll">{weather.Date}</Moment> | {weather.Day.IconPhrase}</p>
                        {
                            isFahrenheit ? <h1 className="temp">{weather.Temperature.Minimum.Value} &deg;F | {weather.Temperature.Maximum.Value} &deg;F</h1>
                                :
                                <h1 className="temp">{((weather.Temperature.Minimum.Value - 32) / 1.8).toFixed()} &deg;C | {((weather.Temperature.Maximum.Value - 32) / 1.8).toFixed()} &deg;C</h1>
                        }
                        {/* {weather.Temperature.Maximum.Value} &deg;F */}
                    </div>

                </div>
            </div>
        </Zoom>
    )
}

const mapStateTpProps = state => {
    const { isFahrenheit } = state.favoriteReducer
    return {
        isFahrenheit
    }
}

export default connect(mapStateTpProps)(FiveDayForecast);