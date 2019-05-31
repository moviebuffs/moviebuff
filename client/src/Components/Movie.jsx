import React from 'react';
// import '../App.css';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    const { movie } = this.props;
    return (
      <div>
        <div>
          <h3>{movie.originalTitle}</h3>
          <p>{movie.overview}</p>
        </div>
        <div>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`} alt=""/>
          <h4>{movie.voteAvg}</h4>
        </div>
        {/* information about movie from api data */}
      </div>
    );
  }
}

export default Movie;