import React from 'react';
// import '../../App.css';
import ReviewList from '../Components/ReviewList.jsx'

class MovieDescript extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    const { movie } = this.props;
    return (
      <div>
        {/* information about movie; buttons for upvote/downvote; button for add to list; tweets; theatre links */}
        <div>
          <h3>{movie.originalTitle}</h3>
          <p>{movie.overview}</p>
        </div>
        <div>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`} alt="" />
          <h4>{movie.voteAvg}</h4>
        </div>
      </div>
    );
  }
}

export default MovieDescript;