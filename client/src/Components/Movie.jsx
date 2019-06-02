import React from 'react';
// import '../App.css';


class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.handleSelect = this.handleSelect.bind(this);

  }

  // send movie id up to main component to handle getting movie info and showing movie details
  handleSelect() {
    console.log(this.props.movie);
    this.props.handleClick(this.props.movie.movieId);
  }

  render() {
    const { movie } = this.props;
    
    return (
      <div>
        <div>
          <h3 onClick={this.props.handleClick} >{movie.title}</h3>
          <p>{movie.overview}</p>
        </div>
        <div>
          <a href="#" onClick={this.handleSelect}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`} alt="" />
          </a>
          <h4>{movie.voteAvg}</h4>
        </div>
        {/* information about movie from api data */}
      </div>
    );
  }
}

export default Movie;