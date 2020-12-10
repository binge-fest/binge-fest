import { Component } from 'react';
import Map from './Map.js';

class Restaurants extends Component {
  constructor() {
    super();
    this.state = {
      restaurantArr: []
    }
  }

  showRestaurants = restaurantArr => {
    this.setState({
      restaurantArr: restaurantArr
    })
  }

  render() {
    return (
      <div className="restaurants">
        <h2>Find restaurants near you</h2>
        <div className="restaurantWrapper">
          <div className="restaurantResults">
            <h3>Restaurants: </h3>
            {this.state.restaurantArr !== [] && (
              this.state.restaurantArr.map(item => {
                return (
                  <div className="restaurant" key={item.id}>
                    <img src={item.image_url} alt=""/>
                    <div className="restaurantText">
                      <h4>{item.name}</h4>
                      <p>{item.categories.map((category, index) => {
                        if (index === 0) {
                          return category.title
                        } else {
                          return ", " + category.title
                        }
                      })}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
          <Map addRestaurants={this.props.addRestaurants} showRestaurants={this.showRestaurants} className="mapComponent" />
          <button onClick={this.props.changeInputScreen}>Go to Tv Shows</button>
          {/* <form onSubmit={this.handleSubmit}>
            <label htmlFor="mapInput"></label>
            <input id="mapInput" type="text" onChange={this.handleChange} />
            
            <button value="submit">Submit</button>
            <button value="submit">Randomizer</button>
          </form> */}
        </div>
      </div>
    )
  }
}

export default Restaurants;