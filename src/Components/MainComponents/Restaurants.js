import { Component } from 'react';
import Map from './Map.js';
import { Link, animateScroll as scroll } from 'react-scroll';

class Restaurants extends Component {
  constructor() {
    super();
    this.state = {
      restaurantArr: null,
      showResults: "false",
      favouriteRestaurant: null,
      resultPageOpen: false,
    }
  }

  showRestaurants = restaurantArr => {
    this.setState({
      restaurantArr: restaurantArr,
      showResults: "true"
    })
  }

  removeRestaurantItem = (id) => {
    const newRestaurantArr = this.state.restaurantArr.filter(restaurant => {
      if (restaurant.id !== id) {
        return restaurant;
      }
    })
    this.setState({
      restaurantArr: newRestaurantArr
    })
  }

// this.props.changeInputScreen
  render() {
    return (
      <div className="restaurants">
        <div className="wrapper">
          <a href="" class="changeScreen" onClick={(e) => {
            e.preventDefault();
            this.props.changeInputScreen();
          }}>
            <img src="./left-arrow.png" alt="Go back arrow" />
          </a>
          <h2>Find restaurants near you</h2>
          <div className="restaurantWrapper">
            <Map addRestaurants={this.props.addRestaurants} showRestaurants={this.showRestaurants} className={`mapComponent ${this.state.showResults}`} showResults={this.state.showResults} />
              {this.state.restaurantArr && (
                <div className="restaurantResults">
                  {this.state.restaurantArr.map(item => {
                    return (
                      <div className="restaurant" key={item.id}>
                        {/* <img src={item.image_url} alt=""/> */}
                        <div
                          className="restaurantImage"
                          style={{ backgroundImage: `url(${item.image_url})` }}
                        ></div>
                        <div className="restaurantText">
                          <div className="removeRestaurant">
                            <i class="fas fa-times" title="Remove from list" onClick={() => this.removeRestaurantItem(item.id)}></i>
                          </div>
                          <h4>{item.name}</h4>
                          <p>{item.categories.map((category, index) => {
                            if (index === 0) {
                              return category.title
                            } else {
                              return ", " + category.title
                            }
                          })}</p>
                          <div className="addRestaurantToFave" title="Add to favourites">
                          <i className={
                            this.state.favouriteRestaurant === item 
                              ? "fas fa-star favourited"  
                              : "fas fa-star"  
                          }  onClick={() => {
                            if (this.state.favouriteRestaurant === item) {
                              this.setState({
                                favouriteRestaurant: null
                              })
                              if (this.state.resultPageOpen) {
                                this.props.addRestaurants(this.state.restaurantArr);
                              }
                            } else {
                              this.setState({
                                favouriteRestaurant: item
                              })
                              if (this.state.resultPageOpen) {
                                this.props.addRestaurants([item]);
                              }
                            }
                          }} ></i>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
          </div>
          <div className="showMeResultsDiv">
            <Link smooth={true} to="results" className="buttons goToResults" onClick={() => { 
              this.setState({
                resultPageOpen: true
              })
              if (this.state.favouriteRestaurant) {
                this.props.addRestaurants([this.state.favouriteRestaurant]);
              } else {
                this.props.addRestaurants(this.state.restaurantArr);
              }
            }} >Show me results!</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Restaurants;