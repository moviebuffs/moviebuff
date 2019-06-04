import React from 'react';
// import '../../../App.css';
import { Parallax } from 'react-materialize';


class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.handleSelect = this.handleSelect.bind(this);

  }

  // send movie id up to main component to handle getting movie info and showing movie details
  handleSelect() {
    this.props.handleClick(this.props.movie);
  }

  
  render() {
    const { movie } = this.props;
    
    return (
      //psuedocode
      <div>
        <Parallax onClick={this.handleSelect} options={ {responsiveThreshold: 3} } image={<img src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`} alt="" />} />
        <div className="section blue">
          <div className="row container">
            <h2 className="white-text text-darken-3 lighten-3" onClick={this.handleSelect}>
              {movie.title}
            </h2>
            <p className="white-text text-darken-3 lighten-3">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;