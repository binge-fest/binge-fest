import { Component } from 'react';
import Map from './Map.js';

class Restaurants extends Component {
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(this.state);
  // }

  // handleChange = (e) => {
  //   const target = e.target;

  //   this.setState({
  //     [target.name]: target.value
  //   });
  // }

  render() {
    return (
      <div className="restaurants">
        <h2>Find restaurants near you</h2>
        <div className="wrapper">
          <div className="restaurantResults">
            <p>test</p>
          </div>
          <Map addRestaurants={this.props.addRestaurants} className="mapComponent" />
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