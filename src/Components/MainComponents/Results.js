import {Component, Fragment} from "react";
import firebase from '../../firebase.js';

class Results extends Component {
  constructor() {
    super();
    this.state = {
      tvShow: null
    }
  }

  componentDidMount(){
    const dbRefTvShows = firebase.database().ref('/tvShows');
    dbRefTvShows.once('value', snapshot => {
      const data = snapshot.val();
      // console.log(data.list);
      const random = Math.floor(Math.random() * data.list);
      let i = 0;
      for (let key in data) {
        if (i === random) {
          this.setState({
            tvShow: data[key]
          })
        }
        i++;
      }
    })
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

              <div className="showResultsContainer">
                {this.state.tvShow && (
                  <div className="showDetails">
                    <div className="showImg">
                      <img src={`https://image.tmdb.org/t/p/original` + this.state.tvShow.poster_path} alt="" />
                    </div>
                    <h3>{this.state.tvShow.name}</h3>
                    <p>{this.state.tvShow.overview}</p>
                  </div>
                )}
              </div>

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

              {/* <img src={image_url} alt="" className="foodImage" /> */}

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Results;