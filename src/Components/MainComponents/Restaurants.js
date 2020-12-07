import { Component } from 'react';

class Restaurants extends Component {
  constructor(){
    super()
    this.state={
      location: 0
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
  }
  render() {
    return (
    
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="mapInput"></label>
        <input id="mapInput" type="text"/>

        <button value="submit">Submit</button>
      </form>

    )
  }
}

export default Restaurants;