import { Component, useState } from 'react';
import firebase from '../../firebase.js';
import axios from 'axios';



class TvShows extends Component {
  constructor() {
    super();
    this.state = {
      tvSearch: '',
      tvGenre: '',
      tvResult: {},
      isOn: true
    }
    
  }



  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios({
      url: 'http://api.tvmaze.com/singlesearch/shows',
      method: 'GET',
      responseType: 'json',
      params: {
        q: this.state.tvSearch
      }
    }).then((res) => {
      console.log(res);
      this.setState({
        tvResult: {
          name: res.data.name,
          rating: res.data.rating.average
        }
      })

      console.log(this.state.tvResult);
      const dbRef = firebase.database().ref('/tvShows');
      dbRef.push(this.state.tvResult);

      dbRef.on('value', (snapshot) => {
        const dataObject = snapshot.val();
        console.log(dataObject);
      })
    })  
  }

  handleChange = (e) => {
    const target = e.target;

    this.setState({
      [target.name]: target.value  
    })
  }




  render() {
    

    return (
      <div id="tvShows" className="tvShows">
        <div className="wrapper">
          <h2>Search for a TV Show</h2>
          <div className="showContainer">
            <div className="showSearch">
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="tvSearch">Search for Show:</label>
                <input type="text" id="tvSearch" name="tvSearch" onChange={this.handleChange} />
                <label htmlFor="tvGenre">Search for Genre:</label>
                <input type="text" id="tvGenre" name="tvGenre" onChange={this.handleChange} />
                <button value="getShows" className="showMeShows">Show Me The Shows!</button>
                <button value="submit" className="showRandomizer"><i className="fas fa-random" title="Click for random option"></i></button>
              </form>
            </div>
            <div id="showResults" className="showSelections">
              <ul>
                <li>
                  <h3>Show title <a href="#"><i class="fas fa-bookmark" title="Add to favourites"></i></a></h3>
                </li>
              </ul>
              <button value="showRestaurants" className="goToRestaurants">Go to restaurants!</button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
export default TvShows;