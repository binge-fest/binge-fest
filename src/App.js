import './App.css';
import axios from 'axios';
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
        <Header />
        <Restaurants />
        <TvShows />
        <Results />
        <Map />
      </div>
    );
  }
}
export default App;
