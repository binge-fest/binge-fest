import {Component, Fragment} from "react";
import firebase from '../../firebase.js';

class Results extends Component {

  
  componentDidMount(){
    const dbRefRestaurant = firebase.database().ref('/restaurantsList');
    dbRefRestaurant.push(this.props.restaurantResult);

    const dbRefTvShows = firebase.database().ref('/tvShows');
    dbRefTvShows.push(this.props.tvResult);
  }

  render () {
    return (
      <section className="results">
        <div className="wrapper">
          <h2>RESULTS</h2>
          <div className="allResults">
            
            <div className="showResults">
              <h2>Your Show</h2>

              <img src="http://www.fillmurray.com/g/200/300" alt="" />
              <h3>Show Title</h3>
              <h4>Rating</h4>
              <p>Description</p>


            </div>
            <div className="foodResults">
              <h2>Your Food</h2>

              <h3>Restaurant Name</h3>
              <h4>Rating, Review Count</h4>
              <h4>Price</h4>
              <h4>Cuisine</h4>
              <h4>Phone Number</h4>
              <h4>Distance</h4>

              <img src="" alt="" />

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Results;