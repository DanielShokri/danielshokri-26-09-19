import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import AppHeader from './Components/AppHeader/AppHeader.cmp';
import HomePage from './Pages/HomePage/HomePage.cmp';
import FavoritePage from './Pages/FavoritePage/FavoritePage.cmp';
import './App.scss';


const App = ({darkMode}) => {
  return (
    <div className={`${darkMode ? 'is-dark-mode' : ''} App`}>
      <AppHeader />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/favorite" component={FavoritePage} />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  const { darkMode } = state.favoriteReducer
  return {
    darkMode
  }
}

export default connect(mapStateToProps)(App);
