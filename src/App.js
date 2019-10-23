import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import AppHeader from "./Components/AppHeader/AppHeader.cmp";
import HomePage from "./Pages/HomePage/HomePage.cmp";
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage.cmp";
import "./App.scss";

const App = ({ darkMode }) => {
  return (
    <div className={`${darkMode ? "is-dark-mode" : ""} App`}>
      <Router>
        <AppHeader />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/favorites" component={FavoritesPage} />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = state => {
  const { darkMode } = state.favoriteReducer;
  return {
    darkMode
  };
};

export default connect(mapStateToProps)(App);
