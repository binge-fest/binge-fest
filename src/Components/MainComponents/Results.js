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
        <div className="showResults">
          <h2>Your Show!</h2>

          {/* <h3>{this.props.tvResult.name}</h3> */}
          {/* <h4>{this.props.tvResult.rating}</h4> */}
          {/* <p>{this.props.tvResult.summary}</p> */}

          <img src="" alt=""/>

        </div>
        <div className="foodResults">
          <h2>Your Restaurant!</h2>

          {/* <h3>{this.props.restaurantResult.name}</h3> */}
          <h4>Rating, Review Count</h4>
          <h4>Price</h4>
          <h4>Cuisine</h4>
          <h4>Phone Number</h4>
          <h4>Distance</h4>

          <img src="" alt=""/>
        </div>
      </section>
    )
  }
}

export default Results;