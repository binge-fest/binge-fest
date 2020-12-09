import { Component } from 'react';
import firebase from '../../firebase.js';
import axios from 'axios';

class TvShows extends Component {
  constructor() {
    super();
    this.state = {
      tvGenre: null,
      tvResult: null,
      tvSearch: '',
      isOn: true,  
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const apiKey = "262b2d458b0315ed4049499ffec1d210";
    
    console.log(this.state);
    axios({
      url: 'https://api.themoviedb.org/3/discover/tv',
      method: 'GET',
      responseType: 'json',
      params: {
        api_key: apiKey,
        language: `en-US`,
        with_genres: this.state.tvGenre,
        page: 1
        // sort_by: `popularity.desc`,
        // page: pages
      }
    }).then(res => {
      console.log(res);
      this.setState({
        tvResult: res.data.results
      })
      
    })
    //   console.log(res);
    //   // this.setState({
    //   //   tvResult: {
    //   //     name: res.data.name,
    //   //     rating: res.data.rating.average
    //   //   }
    //   // })

    //   // console.log(this.state.tvResult);
    //   // const dbRef = firebase.database().ref('/tvShows');
    //   // dbRef.push(this.state.tvResult);

    //   // dbRef.on('value', (snapshot) => {
    //   //   const dataObject = snapshot.val();
    //   //   console.log(dataObject);
    //   // })
    // })  
  }

  handleChange = (e) => {
    const target = e.target;

    this.setState({
      tvGenre: target.value  
    })
  }

  addToDatabase = (show) => {
    console.log(show);
    let isIn = false;
    const tvShowRef = firebase.database().ref('/tvShows');
    tvShowRef.once('value', snapshot => {
      // console.log(snapshot.val());
      const data = snapshot.val();
      for (let tvShowId in data) {
        if (data[tvShowId].name === show.name) {
          isIn = true;
        }  
      }
      if (!isIn) {
        tvShowRef.push(show);
        console.log('not in');
      }
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
                {/* <label htmlFor="tvSearch">Search for Show:</label>
                <input type="text" id="tvSearch" name="tvSearch" onChange={this.handleChange} /> */}
                {/* <label htmlFor="tvGenre">Search for Genre:</label>
                <input type="text" id="tvGenre" name="tvGenre" onChange={this.handleChange} /> */}
                
                <fieldset>
                  <label className="genreCategoryOption" for="comedy">Comedy
                    <input 
                      type="radio" 
                      name="categoryMeal" 
                      value="35" 
                      id="comedy" 
                      onChange={this.handleChange}
                    />
                  </label>
                  <label className="genreCategoryOption" for="scienceFiction">Science-Fiction
                    <input type="radio" name="categoryMeal" value="10765" id="scienceFiction" />
                  </label>
                  <label className="genreCategoryOption" for="Drama">Drama
                    <input type="radio" name="categoryMeal" value="18" id="Drama" />
                  </label>
                  <label className="genreCategoryOption" for="Comedy">Comedy
                    <input type="radio" name="categoryMeal" value="35" id="Comedy" />
                  </label>
                  <label className="genreCategoryOption" for="Comedy">Comedy
                    <input type="radio" name="categoryMeal" value="35" id="Comedy" />
                  </label>
                  <label className="genreCategoryOption" for="Comedy">Comedy
                    <input type="radio" name="categoryMeal" value="35" id="Comedy" />
                  </label>
                  <label className="genreCategoryOption" for="Comedy">Comedy
                    <input type="radio" name="categoryMeal" value="35" id="Comedy" />
                  </label>
                  <label className="genreCategoryOption" for="Comedy">Comedy
                    <input type="radio" name="categoryMeal" value="Comedy" id="Comedy" />
                  </label>
                  <label className="genreCategoryOption" for="Comedy">Comedy
                    <input type="radio" name="categoryMeal" value="Comedy" id="Comedy" />
                  </label>
                  <label className="genreCategoryOption" for="Comedy">Comedy
                    <input type="radio" name="categoryMeal" value="Comedy" id="Comedy" />
                  </label>
                  <label className="genreCategoryOption" for="Comedy">Comedy
                    <input type="radio" name="categoryMeal" value="Comedy" id="Comedy" />
                  </label>
                  <label className="genreCategoryOption" for="Comedy">Comedy
                    <input type="radio" name="categoryMeal" value="Comedy" id="Comedy" />
                  </label>
                  <label className="genreCategoryOption" for="Comedy">Comedy
                    <input type="radio" name="categoryMeal" value="Comedy" id="Comedy" />
                  </label>
                  <label className="genreCategoryOption" for="Comedy">Comedy
                    <input type="radio" name="categoryMeal" value="Comedy" id="Comedy" />
                  </label>
                  <label className="genreCategoryOption" for="Comedy">Comedy
                    <input 
                      type="radio" 
                      name="categoryMeal" 
                      value="Comedy" 
                      id="Comedy" 
                    />
                  </label>
                </fieldset>

                <button value="getShows" className="showMeShows">Show Me The Shows!</button>
                <button value="submit" className="showRandomizer"><i className="fas fa-random" title="Click for random option"></i></button>
              </form>
            </div>
            <div id="showResults" className="showSelections">
              <ul>
                {this.state.tvResult && this.state.tvResult.map(show => {
                  return (
                    <li>
                      <h3>{show.name} <button href="#"><i class="fas fa-bookmark" title="Add to favourites" onClick={() => this.addToDatabase(show)}></i></button></h3>
                      <img src={`https://image.tmdb.org/t/p/original${show.poster_path}`} alt="" className="tvImage" />
                    </li>
                  )
                })}
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