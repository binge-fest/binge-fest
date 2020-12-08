import './App.css';
import Header from './Components/Header.js';
import { Component } from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Restaurants from "./Components/MainComponents/Restaurants.js";
import Results from "./Components/MainComponents/Results.js";
import TvShows from './Components/MainComponents/TvShows.js';
import Map from './Components/MainComponents/Map.js';
import Footer from './Components/Footer.js';




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
              {isOn ? (<TvShows />) : (<Restaurants />)}
              <button onClick={() => this.setState({ isOn: !isOn })}>
                {isOn ? "Tv Shows" : "Restaurants"}
              </button>

            </div>
          </CSSTransition>
        </SwitchTransition>
        
        <Map />
        <Results />
        <Footer />
      </div>
    );
  }
}
export default App;
