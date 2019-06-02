import React from 'react';
import axios from 'axios';
// import '../../App.css';
import ReviewList from '../Components/ReviewList.jsx'

class MovieDescript extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      voteCount: 0,
    };

    this.getReviews = this.getReviews.bind(this);
    // this.getVotes = this.getVotes.bind(this);
    // this.handleVote = this.handleVote.bind(this);
    // this.addToList = this.addToList.bind(this);
  }

  // handle getting reviews for a movie when it is clicked
  getReviews(movie) {
    return axios.post(`/reviews`, {
      movieId: movie.movieId,
    })
      .then((reviews) => {
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
        this.setState({ reviews: reviews })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // getVote() {
  //   return axios.post('/getvote', {
  //     movie: this.props.movie,
  //   })
  //     .then((vote) => {
  //       return vote;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //   });
  // }

  // handleVote(vote) {
  //   return axios.post('/vote', {
  //     movie: this.props.movie,
  //     vote: vote,
  //   })
  //     .then((vote) => {
  //       return vote;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  // addToList() {
  //   return axios.post('/watchlist', {
  //     movie: this.props.movie,
  //     user: this.props.user,
  //   })
  //     .then((vote) => {
  //       return vote;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  // show detailed info about movie and reviews about movie
  render() {
    const { movie } = this.props;
    return (
      <div>
        {/* information about movie; buttons for upvote/downvote; button for add to list; tweets; theatre links */}
        <div>
          <h3>{movie.originalTitle}</h3>
          <h4>{movie.voteAvg}</h4>
          <p>{movie.overview}</p>
        </div>
        <div>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`} alt="" />
        </div>
        <div>
          <button>Upvote</button>
          <h5>{this.state.voteCount}</h5>
          <button>Downvote</button>
          <button>Add to Watchlist</button>
        </div>
        <div>
          <ReviewList reviews={this.state.reviews} />
        </div>
      </div>
    );
  }
}

export default MovieDescript;