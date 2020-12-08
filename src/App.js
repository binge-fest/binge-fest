import './App.css';
import Header from './Components/Header.js';
import { Component } from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Restaurants from "./Components/MainComponents/Restaurants.js";
import Results from "./Components/MainComponents/Results.js";
import TvShows from './Components/MainComponents/TvShows.js';
import Map from './Components/MainComponents/Map.js';




class App extends Component {
  constructor() {
    super();
    this.state = {
    isOn: true
    }
  }
  render() {

    const { isOn } = this.state

    return (
      <div className="app">
        <Header/>

        <SwitchTransition mode="out-in">
          <CSSTransition
            key={isOn ? "on" : "off"}
            timeout={1000}
            classNames='fade'
          >
            <div>
              <button onClick={() => this.setState({ isOn: !isOn })}>
                {isOn ? "Tv Shows" : "Restaurants"}
              </button>

              {isOn ? (<TvShows />) : (<Restaurants />)}
            </div>
          </CSSTransition>
        </SwitchTransition>
        
        <Map />
        <Results />
      </div>
    );
  }
}
export default App;
