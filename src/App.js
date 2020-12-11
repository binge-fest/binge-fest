import './App.css';
import Header from './Components/Header.js';
import { Component } from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Restaurants from "./Components/MainComponents/Restaurants.js";
import Results from "./Components/MainComponents/Results.js";
import TvShows from './Components/MainComponents/TvShows.js';
import Footer from './Components/Footer.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isOn: true,
      restaurantList: null,
    }
  }

  // used to toggle between the TvShows component and the Restaurants component 
  changeInputScreen = () => {
    this.setState({ isOn: !this.state.isOn })
  }

  // this is passed down into the Restaurants component and then into the Map component. once the state has been changed then the results section will be rendered using this data
  addRestaurantsToState = restaurantList => {
    this.setState({
      restaurantList: restaurantList,
    })
  }

  render() {
    return (
      <div className="app">
        <Header/>
        <SwitchTransition mode="out-in">
          <CSSTransition
            in={true}
            appear={true}
            key={this.state.isOn ? "on" : "off"}
            timeout={650}
            classNames="fade"
          >
            <div>
              {this.state.isOn 
                ? (<TvShows changeInputScreen={this.changeInputScreen} />) 
                : (<Restaurants addRestaurants={this.addRestaurantsToState} changeInputScreen={this.changeInputScreen} />)}
            </div>
          </CSSTransition>
        </SwitchTransition>

        {this.state.restaurantList
          ? <Results restaurantList={this.state.restaurantList} />
          : null
        }
        <Footer />
      </div>
    );
  }
}

export default App;
