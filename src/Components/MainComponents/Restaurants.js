import { Component } from 'react';
import firebase from '../../firebase.js';
import axios from 'axios';

class Restaurants extends Component {
  constructor() {
    super();
    this.state = {
      location: 0,
      foodSearch: ''
    }
  }

handleSubmit = (e) => {
  e.preventDefault();
  console.log(this.state);
  axios({
    url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food&latitude=43.22470215689218&longitude=-79.87237315283824&radius=40000',
    method: 'GET',
    responseType: 'json',
    params: {
      Authorization: 'Bearer _ySZyzuihg1O-lyVqCt2-yZN4fuew1KxFLk_27F9XwOYREu5e5Q_mzxfbqBOsAWioxGNmcPeZfUsspraBGysxtP66PZ7KRsC62o6oElSq4iWivyUP4zpB4IizQnLX3Yx',
      q: this.state.foodSearch
    }
  }).then((res) => {
    console.log(res);
    this.setState({
      restaurantResult: {
        name: res.data.name,
        rating: res.data.rating.average
      }
    })
  })
}

handleChange = (e) => {
  const target = e.target;

  this.setState({
    [target.name]: target.value
  });
}

componentDidMount() {
  const dbRef = firebase.database().ref('/restaurantsList');
  dbRef.push(this.state.restaurantResult);

  dbRef.on('value', (snapshot) => {
    const dataObject = snapshot.val();
    console.log(dataObject);
  })
}

render() {
  return (
    <div className="restaurants">
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="mapInput"></label>
        <input id="mapInput" type="text" onChange={this.handleChange} />
        <button value="submit">Submit</button>
        <button value="submit">Randomizer</button>
      </form>
    </div>

  )
}
}

export default Restaurants;