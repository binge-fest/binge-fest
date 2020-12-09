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
        <Map addRestaurants={this.props.addRestaurants} />
        {/* <form onSubmit={this.handleSubmit}>
          <label htmlFor="mapInput"></label>
          <input id="mapInput" type="text" onChange={this.handleChange} />
          
          <button value="submit">Submit</button>
          <button value="submit">Randomizer</button>
        </form> */}
      </div>
    )
  }
}

export default Restaurants;