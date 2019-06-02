import React from 'react';
import axios from 'axios';
// import '../../App.css';
import ReviewList from '../Components/ReviewList.jsx'

class MovieDescript extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };

    this.getReviews = this.getReviews.bind(this);
  }

  // handle getting reviews for a movie when it is clicked
  getReviews(movie) {
    console.log('getReviews', movie)
    console.log({movieId: movie.movieId});
    return axios.post(`/reviews`, {
      movieId: movie.movieId,
    })
      .then((reviews) => {
        console.log('REVIEWS', reviews);
        return reviews.data.reviews;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // when this component is rendered, get reviews
  componentDidMount(e) {
    this.getReviews(this.props.movie)
      .then((reviews) => {
        console.log('REVIEWS', reviews)
        this.setState({ reviews: reviews })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // show detailed info about movie and reviews about movie
  render() {
    const { movie } = this.props;
    return (
      <div>
        {/* information about movie; buttons for upvote/downvote; button for add to list; tweets; theatre links */}
        <div>
          <h3>{movie.title}</h3>
          <h4>{movie.voteAvg}</h4>
          <p>{movie.overview}</p>
        </div>
        <div>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`} alt="" />
        </div>
        <div>
          <ReviewList reviews={this.state.reviews} />
        </div>
      </div>
    );
  }
}

export default MovieDescript;