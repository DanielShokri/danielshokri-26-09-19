import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setDarkMode, setFahrenheitToggle } from '../../store/favorites/favoritesActions'
import { Link } from 'react-router-dom';

import './appheader.styles.scss'

const AppHeader = ({ setDarkMode, setFahrenheitToggle }) => {
    const [burgerActive, setBurgerActive] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isFahre, setIsFahre] = useState(false);

    const handleBurgerClick = () => {
        if (!burgerActive) setBurgerActive(true);
        else setBurgerActive(false);
    }

    const handleDarkMode = () => {
        if (!isDarkMode) {
            setIsDarkMode(true);
            setDarkMode(true);
        }
        else {
            setIsDarkMode(false);
            setDarkMode(false);
        }
    }

    const handleFahrenheitToggle = () => {
        if (!isFahre) {
            setIsFahre(true)
            setFahrenheitToggle(true)
        }
        else {
            setIsFahre(false)
            setFahrenheitToggle(false)
        }
    }

    return (
        <div>
            <nav className={`${isDarkMode ? 'is-dark' : ''} navbar`} role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="logo" to="/">
                        <img src="https://i.imgur.com/5qdECQv.png" style={{padding: '10px'}} alt="logo" width="220"/>
                    </Link>

                    <div role="button" onClick={handleBurgerClick} className={`${burgerActive ? 'is-active' : ''} navbar-burger burger`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </div>
                </div>

                <div id="navbarBasicExample" className={`${burgerActive ? 'is-active' : ''} navbar-menu`}>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons" style={{ justifyContent: 'center' }}>
                                <div className="button is-light" style={{ cursor: 'pointer' }} href="#" onClick={handleDarkMode}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</div>
                                <div className="button is-light" style={{ cursor: 'pointer' }} href="#" onClick={handleFahrenheitToggle}>{isFahre ? 'Celsius' : 'Fahrenheit'}</div>
                                <Link className="button is-light" to="/">HOME</Link>
                                <Link className="button is-light" to="/favorite">FAVORITES</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div >
    )
}

const mapDispatchToProps = dispatch => ({
    setDarkMode: isDark => dispatch(setDarkMode(isDark)),
    setFahrenheitToggle: setFahrenheit => dispatch(setFahrenheitToggle(setFahrenheit))
})

export default connect(null, mapDispatchToProps)(AppHeader);