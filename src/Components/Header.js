import { Component } from 'react';
import { Link } from 'react-scroll';


class Header extends Component {
  render() {
    return (
      <header>
        <div className="wrapper">
          <h1>BINGE FEST</h1>
          <p>Feeling indecisive? Let us help you find a tv show to binge and a restaurant to order from!</p>
          <Link smooth={true} to="tvShows" className="buttons">Enter</Link>
        </div>
      </header>
    )
  }
}

export default Header;



