import { Component, Fragment } from 'react';
import firebase from '../../firebase.js';
import axios from 'axios';
class TvShows extends Component {
  constructor() {
    super();
    this.state = {
      tvSearch: '',
      tvGenre: '',
      tvResult: {}
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
      <Fragment>
        <h2>Search for a TV Show</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="tvSearch"></label>
          <input type="text" id="tvSearch" name="tvSearch" onChange={this.handleChange} />
          <label htmlFor="tvGenre"></label>
          <input type="text" id="tvGenre" name="tvGenre" onChange={this.handleChange} />
          <button value="submit">Randomizer</button>
        </form>
      </Fragment>
    )
  }
}
export default TvShows;