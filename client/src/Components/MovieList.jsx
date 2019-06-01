import React from 'react';
import M from 'materialize-css';
// import '../App.css';
import Movie from './Movie.jsx';
// import Carousel from './Carousel.jsx';

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    const { movies } = this.props;
    return (
      <div>
        {movies.map((movie) => {
          return <Movie movie={movie} handleClick={this.props.handleClick}/>
        })}
      </div>
    );
  }
}

export default MovieList;