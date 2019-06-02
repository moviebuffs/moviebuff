import React from 'react';
import { Parallax, Button, Card, Row, Col } from 'react-materialize';
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
    this.props.handleClick(this.props.movie.movieId);
  }

  
  render() {
    const { movie } = this.props;
    
    return (
      <div>
        <Parallax image={<img src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`} alt="" />} />
        <div className="section white">
          <div className="row container">
            <h2 className="header">
              {movie.title}
            </h2>
            <p className="grey-text text-darken-3 lighten-3">
              {movie.overview}
            </p>
          </div>
        </div>
        <Parallax image={<img src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`} alt="" />} />
      </div>
      // <div>
      //   <div>
      //     <h3 onClick={this.props.handleClick} >{movie.title}</h3>
      //     <p>{movie.overview}</p>
      //   </div>
      //   <div>
      //     <a href="#" onClick={this.handleSelect}>
      //       <img src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`} alt="" />
      //     </a>
      //     <h4>{movie.voteAvg}</h4>
      //   </div>
      //   {/* information about movie from api data */}
      // </div>
    );
  }
}

export default Movie;