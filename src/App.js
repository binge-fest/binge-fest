import './App.css';
import axios from 'axios';
import Header from './Components/Header.js';
import { Component } from 'react';
import Restaurants from "./Components/MainComponents/Restaurants.js";
import Results from "./Components/MainComponents/Results.js";
import TvShows from './Components/MainComponents/TvShows.js';
class App extends Component {
  constructor() {
    super();
    this.state = {
      tvshow: []
    }
  }
  // componentDidMount() {
  // }
  handleClick = () => {
    axios({
      url: 'http://api.tvmaze.com/singlesearch/shows',
      method: 'GET',
      responseType: 'json',
      params: {
        q: 'friends'
      }
    }).then((res) => {
      console.log(res);
    })
    const apiKey = "_ySZyzuihg1O-lyVqCt2-yZN4fuew1KxFLk_27F9XwOYREu5e5Q_mzxfbqBOsAWioxGNmcPeZfUsspraBGysxtP66PZ7KRsC62o6oElSq4iWivyUP4zpB4IizQnLX3Yx";
    axios({
      url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search',
      method: 'GET',
      responseType: 'json',
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      params: {
        term: 'food',
        latitude: 43.22470215689218,
        longitude: -79.87237315283824,
      }
    }).then(res => console.log(res))
  }
  render() {
    return (
      <div className="App">
        <Header />
        <button onClick={this.handleClick}>Click meeee</button>
        <Restaurants />
        <TvShows />
        <Results />
      </div>
    );
  }
}
export default App;