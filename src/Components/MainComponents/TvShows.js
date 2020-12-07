import { Component, Fragment } from 'react';
import firebase from '../../firebase.js';
import axios from 'axios';
class TvShows extends Component {
  constructor() {
    super();
    this.state = {
      tvShow: {
        name: 'friends',
        rating: 10
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
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
  }
  handleChange = (e) => {
    this.setState({
    })
  }
  componentDidMount() {
    const dbRef = firebase.database().ref('/tvShows');
    dbRef.push(this.state.tvShow);
    dbRef.on('value', (snapshot) => {
      const dataObject = snapshot.val();
      console.log(dataObject);
    })
  }
  render() {
    return (
      <Fragment>
        <h2>Search for a TV Show</h2>
        <form action="">
          <label htmlFor="tvSearch"></label>
          <input type="text" id="tvSearch" />
        </form>
        <button>Randomizer</button>
      </Fragment>
    )
  }
}
export default TvShows;