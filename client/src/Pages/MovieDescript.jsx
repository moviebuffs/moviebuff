import React from 'react';
import axios from 'axios';
// import { Button, Card, Row, Col } from 'react-materialize';
import Button from '@material-ui/core/Button';
// import '../../App.css';
import ReviewList from '../Components/ReviewList.jsx';

import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      main: '#f44336',
    },
  },
});

class MovieDescript extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      movies: [],
    };

    this.getReviews = this.getReviews.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.addToList = this.addToList.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
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
        this.setState({
          reviews: reviews,
          userVotes: this.props.userVotes,
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleVote(vote) {
    const { movie } = this.props;
    return axios.put('/votes', {
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.posterPath,
      vote_count: movie.voteCount,
      vote_average: movie.voteAvg,
      numFlag: vote,
    })
      .then((res) => {
        this.setState({
          userVotes: res.data[0].userVotes,
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  upvote() {
    this.handleVote(1);
  }

  downvote() {
    this.handleVote(-1);
  }

  addToList() {
    const { movie } = this.props;
    return axios.post('/movies', {
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.posterPath,
      vote_count: movie.voteCount,
      vote_average: movie.voteAvg,
      email: this.props.user.email,
    })
      .then((res) => {
        console.log(res);
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
          <Button onClick={this.upvote} variant="contained" color="primary">Upvote</Button>
          <h5>{this.state.userVotes}</h5>
          <Button onClick={this.downvote} variant="contained" color="primary">Downvote</Button>
          <Button onClick={this.addToList} variant="contained" color="primary">Add to Watchlist</Button>
        </div>
        <div>
          <ReviewList reviews={this.state.reviews} />
        </div>
      </div>
    );
  }
}

export default MovieDescript;