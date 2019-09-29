import React from 'react';
import './homepage.styles.scss';
import MainForecast from '../../Components/MainForecast/MainForecast.cmp';
import InputForm from '../../Components/InputForm/InputForm.cmp';

const HomePage = () => {

    return (
        <div className="home-page">
            <InputForm />
            <MainForecast />
        </div>
    )
}

export default HomePage;
