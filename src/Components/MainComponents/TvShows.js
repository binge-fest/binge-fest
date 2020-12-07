import { Component, Fragment } from 'react';

class TvShows extends Component {
    render() {
        return (
            <Fragment>
            <h2>Search for a TV Show</h2>
            <form action="">
                <label htmlFor="tvSearch"></label>
                <input type="text" id="tvSearch"/>
            </form>
            
            <button>Randomizer</button>
            </Fragment>

        )
    }
}

export default TvShows;