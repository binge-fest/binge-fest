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
      onFavourites: [],
      numberOfShows: null,
      showListObject: {}
    }
  }

  componentDidMount() {
    const numberOfShowsRef = firebase.database().ref('/tvShows/numberOfShows');
    const showListRef = firebase.database().ref('tvShows');
    numberOfShowsRef.once('value', snapshot => {
      const data = snapshot.val();
      // console.log('number of shows: ', data);
      this.setState({
        numberOfShows: data
      })
    }) 
    showListRef.once('value', snapshot => {
      const data = snapshot.val();
      // console.log('shows object: ', data);
      const showListObj = {}
      for (let showName in data) {
        showListObj[showName] = showName
      }
      console.log(showListObj);
      this.setState({
        showListObject: showListObj
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const apiKey = "262b2d458b0315ed4049499ffec1d210";
    
    // console.log(this.state);
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
      // console.log(res);
      // const test = 'Supernaturall';
      // console.log('test', this.state.showListObject[`${test}`]);
      const results = res.data.results.map(show => {
        // console.log('show name: ', show.name);
        // console.log('state name: ',this.state.showListObject[`${show.name}`])
        if (show.name === this.state.showListObject[`${show.name}`]) {
          show.isSaved = true;
          console.log('name: ', show.name, 'state name: ', this.state.showListObject[show.name]);
          return show;
        } else {
          show.isSaved = false;
          return show;
        }
      })
      console.log(results);
      this.setState({
        tvResult: results
      })
    })
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
    const tvShowRef = firebase.database().ref(`/tvShows/${show.name}`);
    const tvShowListRef = firebase.database().ref('/tvShows');
    tvShowRef.once('value', snapshot => {
      // console.log(snapshot.val());
      const dataObj = snapshot.val();
      // for (let tvShowName in dataObj) {
      //   if (tvShowName === show.name) {
      //     isIn = true;
      //   }  
      // }
      if (!dataObj) {
        show.isSaved = true;
        tvShowRef.update({
          [show.name]: show
        });
        tvShowListRef.update({
          numberOfShows: this.state.numberOfShows + 1
        })
        this.setState({
          numberOfShows: this.state.numberOfShows + 1
        })
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
            <p>Number of stored tv shows: {this.state.numberOfShows}</p>
            <div className="showSearch">
              <form onSubmit={this.handleSubmit}>
                {/* <label htmlFor="tvSearch">Search for Show:</label>
                <input type="text" id="tvSearch" name="tvSearch" onChange={this.handleChange} /> */}
                {/* <label htmlFor="tvGenre">Search for Genre:</label>
                <input type="text" id="tvGenre" name="tvGenre" onChange={this.handleChange} /> */}
                
                <fieldset>
                  <label className="genreCategoryOption" htmlFor="animation">Animation
                    <input 
                      type="radio" 
                      name="categoryMeal" 
                      value="16" 
                      id="animation" 
                      onChange={this.handleChange}
                    />
                  </label>
                  <label className="genreCategoryOption" htmlFor="scienceFiction">Sci-Fi and Fantasy
                    <input type="radio" name="categoryMeal" value="10765" id="scienceFiction" onChange={this.handleChange}/>
                  </label>
                  <label className="genreCategoryOption" htmlFor="drama">Drama
                    <input type="radio" name="categoryMeal" value="18" id="drama" onChange={this.handleChange} />
                  </label>
                  <label className="genreCategoryOption" htmlFor="comedy">Comedy
                    <input type="radio" name="categoryMeal" value="35" id="comedy" onChange={this.handleChange} />
                  </label>
                  <label className="genreCategoryOption" htmlFor="crime">Crime
                    <input type="radio" name="categoryMeal" value="80" id="crime" onChange={this.handleChange} />
                  </label>
                  <label className="genreCategoryOption" htmlFor="documentary">Documentary
                    <input type="radio" name="categoryMeal" value="99" id="documentary" onChange={this.handleChange} />
                  </label>
                  <label className="genreCategoryOption" htmlFor="mystery">Mystery
                    <input type="radio" name="categoryMeal" value="9648" id="mystery" onChange={this.handleChange}/>
                  </label>
                  <label className="genreCategoryOption" htmlFor="reality">Reality
                    <input type="radio" name="categoryMeal" value="10764" id="reality" onChange={this.handleChange}/>
                  </label>
                  <label className="genreCategoryOption" htmlFor="soap">Soap
                    <input type="radio" name="categoryMeal" value="10766" id="soap" onChange={this.handleChange} />
                  </label>
                </fieldset>
                
                <button value="getShows" className="buttons" id="red">Search</button>
                <button value="submit" className="buttons" id="red"><i className="fas fa-random" title="Click for random option"></i></button>
                <button className="buttons" id="red" onClick={this.props.changeInputScreen}>choose your Restaurant</button>
              </form>
            </div>
            <div id="showResults" className="showSelections">
              <ul>
                {this.state.tvResult && this.state.tvResult.map(show => {
                  return (
                    <li>
                      <i class={`fas fa-bookmark ${show.isSaved}`} title="Add to favourites" onClick={() => this.addToDatabase(show)}></i>
                      <img src={`https://image.tmdb.org/t/p/original${show.poster_path}`} alt="" className="tvImage" />
                    </li>
                  )
                })}
              </ul>
              {/* <button value="showRestaurants" className="goToRestaurants">Go to restaurants!</button> */}
            </div>
          </div>
        </div>
      </div>

    )
  }
}
export default TvShows;