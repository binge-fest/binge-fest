import {Component, Fragment} from "react";
import firebase from '../../firebase.js';

class Results extends Component {
  componentDidMount(){
    const dbRefTvShows = firebase.database().ref('/tvShows');
    dbRefTvShows.push(this.props.tvResult);
  }

  render () {
    const { name, rating, review_count, price, categories, display_phone, distance, image_url } = this.props.restaurant;

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

              <h3>{name} ({price})</h3>
              <h4>Rating: {rating}, Reviews: {review_count}</h4>
              <h4>{categories.map(category => {
                return category.title + ', '
              })}</h4>
              <h4>Phone: {display_phone}</h4>
              <h4>Distance from user: {Math.round(distance / 100) / 10}</h4>

              <img src={image_url} alt="" className="foodImage" />

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Results;