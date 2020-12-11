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

  componentDidUpdate(prevProps) {
    console.log('prev props: ', prevProps);
    console.log('current props: ', this.props);
    if (prevProps !== this.props) {
      if (this.props.restaurantList) {
        this.setState({
          restaurantList: this.props.restaurantList
        })
        this.getRandomRestaurant(this.props.restaurantList);
      } 
    }
  }

  componentDidMount(){
    
    const dbRefTvShows = firebase.database().ref('/tvShows');
    dbRefTvShows.once('value', snapshot => {
      const data = snapshot.val();
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
    if (this.props.restaurantList) {
      this.setState({
        restaurantList: this.props.restaurantList
      })
      this.getRandomRestaurant(this.props.restaurantList);
    }
  }

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
                    <div className="showImg">
                      <img src={`https://image.tmdb.org/t/p/original` + this.state.tvShow.poster_path} alt="" />
                    </div>
                    <h3>{this.state.tvShow.name}</h3>
                    <p>{this.state.tvShow.overview}</p>
                  </div>
                )}
              </div>
            </div>
              {this.state.restaurant && (
                <div className="foodResults">
                  <h2>Your Food</h2>
                  <h3>{this.state.restaurant.name} {this.state.restaurant.price}</h3>
                  <h4>{this.state.restaurant.rating.map(star => {
                    return star
                  })} Reviews: {this.state.restaurant.review_count}</h4>
                  <h4>{this.state.restaurant.categories && (
                    this.state.restaurant.categories.map(category => {
                      return category.title + ', '
                  }))}</h4>
                  <h4>Phone: {this.state.restaurant.display_phone}</h4>
                  <h4>Distance from user: {Math.round(this.state.restaurant.distance / 100) / 10}</h4>
                </div>
              )}
              {/* <img src={image_url} alt="" className="foodImage" /> */} 
          </div>
          <div className="chooseAnotherDiv">
            <button className="buttons" onClick={() => this.getRandomRestaurant()}>Try again?</button>
          </div>
        </div>
      </section>
    )
  }
}

export default Results;