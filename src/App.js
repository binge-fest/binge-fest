import './App.css';
import Header from './Components/Header.js';
import { Component } from 'react';
import Restaurants from "./Components/MainComponents/Restaurants.js";
import Results from "./Components/MainComponents/Results.js";
import TvShows from './Components/MainComponents/TvShows.js';
import Map from './Components/MainComponents/Map.js';




class App extends Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <TvShows/>
        <Restaurants />
        <Map />
        <Results />
      </div>
    );
  }
}

export default App;
