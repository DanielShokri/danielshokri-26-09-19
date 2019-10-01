import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import AppHeader from './Components/AppHeader/AppHeader.cmp';
import HomePage from './Pages/HomePage/HomePage.cmp';
import FavoritesPage from './Pages/FavoritesPage/FavoritesPage.cmp';
import './App.scss';


const App = ({darkMode}) => {
  return (
    <div className={`${darkMode ? 'is-dark-mode' : ''} App`}>
      <AppHeader />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/favorites" component={FavoritesPage} />
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
