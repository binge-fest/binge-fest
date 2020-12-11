import {Component, Fragment} from "react";
import firebase from '../../firebase.js';

class Results extends Component {
  constructor() {
    super();
    this.state = {
      tvShow: null,
      restaurant: null,
      restaurantList: null,
    }
  }

  // this is essentially for when this results component is already displayed but the user goes back and favourites a restaurant. we needed a way for it to rerender this component with the new favourite restaurant and this was our solution
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.restaurantList) {
        this.setState({
          restaurantList: this.props.restaurantList
        })
        this.getRandomRestaurant(this.props.restaurantList);
      } 
    }
  }

  // always starts off with a random show and if it's passed a restaurant array it will get a random one as well
  componentDidMount() {
    this.getRandomShow();
    if (this.props.restaurantList) {
      this.setState({
        restaurantList: this.props.restaurantList
      })
      this.getRandomRestaurant(this.props.restaurantList);
    }
  }

  // gets a new random show. there is a [key][key] because the data is nested one deep
  getRandomShow = () => {
    const dbRefTvShows = firebase.database().ref('/tvShows');
    dbRefTvShows.once('value', snapshot => {
      const data = snapshot.val();
      const random = Math.floor(Math.random() * data.numberOfShows);
      let i = 0;
      for (let key in data) {
        if (i === random) {
          this.setState({
            tvShow: data[key][key]
          })
        }
        i++;
      }
    })
  }

  // gets a new randomRestaurant. it will prioritize the list that is given to the function but if it doesn't get a list then it will just use the state.
  getRandomRestaurant = restaurantList => {
    let localRestaurantList = [];
    if (restaurantList) {
      localRestaurantList = restaurantList;
    } else {
      localRestaurantList = this.state.restaurantList;
    }
    const length = localRestaurantList.length;
    const random = Math.floor(Math.random() * length);
    const stars = [];
    for (let i = 0; i < localRestaurantList[random].rating; i++) {
      stars.push(<img src="./star.svg" alt="a star" className="star" />)
    }
    localRestaurantList[random].rating = stars;
  
    this.setState({
      restaurant: localRestaurantList[random]
    })
  }

  render () {
    return (
      <section id="results" className="results">
        <div className="wrapper">
          <h2>RESULTS</h2>
          <div className="allResults">
            
            <div className="showResults">
              <h2>Your Show</h2>

              <div className="showResultsContainer">
                {this.state.tvShow && (
                  <div className="showDetails">
                    <img src={`https://image.tmdb.org/t/p/original` + this.state.tvShow.poster_path} alt={`Poster for ${this.state.tvShow.name}`} />
                    <h3>{this.state.tvShow.name}</h3>
                    <p>{this.state.tvShow.overview}</p>
                  </div>
                )}
              </div>
            </div>
              {this.state.restaurant && (
                <div className="foodResults">
                  <h2>Your Food</h2>
                  <div
                    className="foodImage"
                    style={{ backgroundImage: `url(${this.state.restaurant.image_url})` }}
                  ></div>
                  <h3>{this.state.restaurant.name} {this.state.restaurant.price}</h3>
                  <h4>{this.state.restaurant.rating.map(star => {
                    return star
                  })} Reviews: {this.state.restaurant.review_count}</h4>
                  <h4>{this.state.restaurant.categories && (
                    this.state.restaurant.categories.map((category, index) => {
                      if (this.state.restaurant.categories.length - 1 === index) {
                        return category.title;
                      } else {
                        return category.title + ', ';
                      }
                  }))}</h4>
                  <h4>Phone: {this.state.restaurant.display_phone}</h4>
                  <h4>Distance: {Math.round(this.state.restaurant.distance / 100) / 10}km</h4>
                </div>
              )}
          </div>
          <div className="chooseAnotherDiv">
            <button className="buttons" onClick={() => {
              this.getRandomRestaurant();
              this.getRandomShow();
            }}>Try again?</button>
          </div>
        </div>
      </section>
    )
  }
}

export default Results;