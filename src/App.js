import './App.css';
import axios from 'axios';
import Header from './Components/Header.js';
import { Component } from 'react';



class App extends Component {
  constructor() {
    super();
    this.state = {
      tvshow: []
    }


  }

  componentDidMount() {
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
    axios({
      url: 'https://api.yelp.com/v3/businesses/search',
      method: 'GET',
      responseType: 'json',
      params: {
        latitude: 43.22470215689218,
        longtitude: -79.87237315283824,
        term: 'food'
      },
      header: {
        Authorization: 'Bearer _ySZyzuihg1O-lyVqCt2-yZN4fuew1KxFLk_27F9XwOYREu5e5Q_mzxfbqBOsAWioxGNmcPeZfUsspraBGysxtP66PZ7KRsC62o6oElSq4iWivyUP4zpB4IizQnLX3Yx'
      }
    }).then((res) => {
      console.log(res);
      
    })
    
  }

  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
