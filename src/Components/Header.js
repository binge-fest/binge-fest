import { Component } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';


class Header extends Component {
  render() {
    return (
      <header>
        <div className="wrapper">
          <h1>BINGE FEST</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita quod fugiat nesciunt beatae nemo delectus exercitationem aperiam quae est cum.</p>
          <Link smooth={true} to="tvShows" className="headerLink">Enter</Link>
        </div>
      </header>
    )
  }
}

export default Header;



