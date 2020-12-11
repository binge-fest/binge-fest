import { Component } from 'react';
import firebase from '../../firebase.js';
import axios from 'axios';

class TvShows extends Component {
  constructor() {
    super();
    this.state = {
      tvGenre: null,
      tvResult: null,
      numberOfShows: null,
      showListObject: {}
    }
  }

  componentDidMount() {
    // connect to databases and initially set state for some important info
    const numberOfShowsRef = firebase.database().ref('/tvShows/numberOfShows');
    const showListRef = firebase.database().ref('tvShows');
    numberOfShowsRef.once('value', snapshot => {
      const data = snapshot.val();
      this.setState({
        numberOfShows: data
      })
    }) 
    // we use the showListObject on state for when we are adding to database. it helps us index immediately and check to see if the value is already in database or not (faster than iterating over the whole thing)
    showListRef.once('value', snapshot => {
      const data = snapshot.val();
      const showListObj = {}
      for (let showName in data) {
        showListObj[showName] = showName
      }
      this.setState({
        showListObject: showListObj
      })
    })
  }

  // handle change function used for when we call axios on submission
  handleChange = (e) => {
    const target = e.target;

    this.setState({
      tvGenre: target.value  
    })
  }

  // checks to see if show is in database. snapshot.val() returns null if it does not exist, that's why we have the if(!dataObj)
  addToDatabase = (show) => {
    const tvShowRef = firebase.database().ref(`/tvShows/${show.name}`);
    const tvShowListRef = firebase.database().ref('/tvShows');
    tvShowRef.once('value', snapshot => {
      const dataObj = snapshot.val();
    
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
      }
    })
  }

  // similiar to the function above, except we do not need to check to see if it exists (we already know) it also modifies the state which causes a rerender and changes the class of the bookmark so it's not coloured in with orange anymore 
  removeFromDatabase = (show) => {
    const tvShowRef = firebase.database().ref(`/tvShows/${show.name}`);
    const tvShowListRef = firebase.database().ref('/tvShows');
    
    tvShowRef.update({
      [show.name]: null
    });
    tvShowListRef.update({
      numberOfShows: this.state.numberOfShows - 1
    })
    this.setState({
      numberOfShows: this.state.numberOfShows - 1
    })

    const newArray = this.state.tvResult.map(stateShow => {
      if (stateShow.name === show.name) {
        stateShow.isSaved = false;
      }
      return stateShow;
    })
    this.setState({
      tvResult: newArray
    })
  }

  // in the .then it compares each show against the one in the initial showListObject which is from the database. if it is then we add "isSaved: true" to the show otherwise it is "isSaved: true"
  handleSubmit = (e) => {
    e.preventDefault();
    const apiKey = "262b2d458b0315ed4049499ffec1d210";
    
    axios({
      url: 'https://api.themoviedb.org/3/discover/tv',
      method: 'GET',
      responseType: 'json',
      params: {
        api_key: apiKey,
        language: `en-US`,
        with_genres: this.state.tvGenre,
        page: 1
      }
    }).then(res => {
      const results = res.data.results.map(show => {
        if (show.name === this.state.showListObject[`${show.name}`]) {
          show.isSaved = true;
          return show;
        } else {
          show.isSaved = false;
          return show;
        }
      })
      this.setState({
        tvResult: results
      })
    })
  }

  render() {
    return (
      <div id="tvShows" className="tvShows">
        <div className="wrapper">
          <h2>Search for a TV Show</h2>
          <div className="showContainer">
            <p>Number of stored tv shows: <span>{this.state.numberOfShows}</span></p>
            <div className="showSearch">
              <form>             
                <fieldset>
                  <label className={
                      this.state.tvGenre === "16"  
                        ? `genreCategoryOption activated`
                        : `genreCategoryOption`
                    } htmlFor="animation">Animation
                    <input type="radio" name="categoryGenre" value="16" id="animation" onChange={this.handleChange}/>
                  </label>
                  <label className={
                    this.state.tvGenre === "10765"
                      ? "genreCategoryOption activated"
                      : "genreCategoryOption"
                  } htmlFor="scienceFiction">Sci-Fi and Fantasy
                    <input type="radio" name="categoryGenre" value="10765" id="scienceFiction" onChange={this.handleChange}/>
                  </label>
                  <label className={
                    this.state.tvGenre === "18"
                      ? "genreCategoryOption activated"
                      : "genreCategoryOption"
                  } htmlFor="drama">Drama
                    <input type="radio" name="categoryGenre" value="18" id="drama" onChange={this.handleChange} />
                  </label>
                  <label className={
                    this.state.tvGenre === "35"
                      ? "genreCategoryOption activated"
                      : "genreCategoryOption"
                  } htmlFor="comedy">Comedy
                    <input type="radio" name="categoryGenre" value="35" id="comedy" onChange={this.handleChange} />
                  </label>
                  <label className={
                    this.state.tvGenre === "80"
                      ? "genreCategoryOption activated"
                      : "genreCategoryOption"
                  } htmlFor="crime">Crime
                    <input type="radio" name="categoryGenre" value="80" id="crime" onChange={this.handleChange} />
                  </label>
                  <label className={
                    this.state.tvGenre === "99"
                      ? "genreCategoryOption activated"
                      : "genreCategoryOption"
                  } htmlFor="documentary">Documentary
                    <input type="radio" name="categoryGenre" value="99" id="documentary" onChange={this.handleChange} />
                  </label>
                  <label className={
                    this.state.tvGenre === "9648"
                      ? "genreCategoryOption activated"
                      : "genreCategoryOption"
                  } htmlFor="mystery">Mystery
                    <input type="radio" name="categoryGenre" value="9648" id="mystery" onChange={this.handleChange}/>
                  </label>
                  <label className={
                    this.state.tvGenre === "10764"
                      ? "genreCategoryOption activated"
                      : "genreCategoryOption"
                  } htmlFor="reality">Reality
                    <input type="radio" name="categoryGenre" value="10764" id="reality" onChange={this.handleChange}/>
                  </label>
                  <label className={
                    this.state.tvGenre === "10766"
                      ? "genreCategoryOption activated"
                      : "genreCategoryOption"
                  } htmlFor="soap">Soap
                    <input type="radio" name="categoryGenre" value="10766" id="soap" onChange={this.handleChange} />
                  </label>
                </fieldset>     
                <button onClick={this.handleSubmit} className="buttons dark">Search</button>
                <a className="buttons dark" id="dark" onClick={this.props.changeInputScreen}>choose your Restaurant</a>
              </form>
            </div>
            <div id="showResults" className="showSelections">
              <ul>
                {this.state.tvResult && this.state.tvResult.map(show => {
                  return (
                    <li key={show.name}>
                      <i 
                        className={`fas fa-bookmark ${show.isSaved}`} 
                        title="Add to favourites" onClick={() => {
                          if (show.isSaved) {
                            this.removeFromDatabase(show);
                          } else { 
                            this.addToDatabase(show);
                          }
                        }}
                      ></i>
                      <img src={`https://image.tmdb.org/t/p/original${show.poster_path}`} alt="Poster of show" className="tvImage" />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TvShows;